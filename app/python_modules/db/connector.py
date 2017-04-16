import sqlite3

from app.python_modules.db import db_init


def connect(db_name, csv_dir_path, subject_json_path):
    cursor = sqlite3.connect(db_name).cursor()
    cursor.row_factory = sqlite3.Row
    if not db_init.is_db_inited(cursor):
        db_init.init_db(cursor)
        db_init.fill_db(cursor, csv_dir_path, subject_json_path)
    return cursor
