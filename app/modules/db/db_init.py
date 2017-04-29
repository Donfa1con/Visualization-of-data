import os
import re

import config
from app.modules.db import connector
from app.modules.external_api import yandex_geocoder
from app.modules.raw_data import csv_data_parser, subjects


def create_schools_table(cursor):
    cursor.executescript('''
    CREATE TABLE schools(
      school_id INTEGER PRIMARY KEY,
      name TEXT,
      address TEXT,
      website TEXT,
      latitude REAL,
      longitude REAL
    );
    ''')


def create_subjects_table(cursor):
    cursor.executescript('''
    CREATE TABLE subjects(
      subject_id INTEGER,
      name TEXT,
      data_name TEXT
    );
    ''')


def create_exam_result_table(cursor):
    cursor.executescript('''
        CREATE TABLE exam_result(
          school_id INTEGER,
          subject_id INTEGER,
          year INTEGER,
          exam_type TEXT,
          amount INTEGER,
          gpa REAL,
          success_percent REAL,
          PRIMARY KEY (school_id, subject_id, year, exam_type),
          FOREIGN KEY (school_id) REFERENCES schools(school_id),
          FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
        );
        ''')


def fill_db(cursor, csv_dir_path, subject_json_path):
    table_files = os.listdir(csv_dir_path)
    subjects_info = subjects.get_subjects_info(subject_json_path)
    cursor.executemany('''
    INSERT INTO subjects VALUES (:id, :name, :data_name)
    ''', subjects_info)
    for table_file in table_files:
        table_path = "%s%s" % (csv_dir_path, table_file)
        year = re.match('data-(\d+)', table_file).group(1)
        table_data = csv_data_parser.parse_table(table_path, subjects_info, year)
        cursor.executemany('''
                INSERT OR REPLACE INTO schools VALUES (
                    :school_id,
                    :name,
                    :address,
                    :website,
                    :latitude,
                    :longitude
                );
                    ''', table_data['school_info'])
        cursor.executemany('''
                INSERT OR REPLACE INTO exam_result VALUES (
                    :school_id,
                    :subject_id,
                    :year,
                    :exam_type,
                    :amount,
                    :gpa,
                    :success_percent
                );
                    ''', table_data['exam_results'])
    schools = cursor.execute("SELECT school_id, address FROM schools").fetchall()
    for school in schools:
        true_coords = yandex_geocoder.get_coords_from_address(school['address'])
        cursor.execute('''
        UPDATE schools SET
        latitude = :latitude,
        longitude = :longitude
        WHERE school_id = :school_id
        ''', {
            'latitude': true_coords['latitude'],
            'longitude': true_coords['longitude'],
            'school_id': school['school_id']
        })
    cursor.connection.commit()


def is_db_inited(cursor):
    table_list = cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    return len(table_list.fetchall()) > 0


def init_db(cursor=None):
    if cursor is None:
        cursor = connector.connect(
            config.DB_NAME,
            config.DATA_CSV_DIR_PATH,
            config.SUBJECTS_JSON_PATH
        )
    create_schools_table(cursor)
    create_subjects_table(cursor)
    create_exam_result_table(cursor)
