import csv
import json
import codecs


def read_json_file(path):
    with codecs.open(path, 'r', 'utf-8') as file:
        return json.load(file)


def read_csv_file(path):
    with open(path) as csv_file:
        reader = csv.DictReader(csv_file, delimiter=';')
        return list(reader)
