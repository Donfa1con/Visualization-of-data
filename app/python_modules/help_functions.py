import csv
import json

def read_csv_file(path_to_file):
    with open(path_to_file) as csv_file:
        reader = csv.DictReader(csv_file, delimiter=';')
        ordered_dict_struct = list(reader)
        return ordered_dict_struct

def record_to_file(data, file_name):
    with open(file_name, "w", encoding = "utf-8") as file:
        json.dump(data, file, ensure_ascii = False)

def read_the_file(file_name):
    with open(file_name, "r", encoding="utf-8") as file:
        return json.load(file)
    
def get_number(field_value):
    if isinstance(field_value,(float, int)):
        return field_value
    if ',' in field_value:
        score = field_value.split(',')
        float_number = int(score[0]) + int(score[1]) / 100
        return float_number
    return int(field_value)

def is_valid_field(key, field_value):
    if 'GPA' in key and field_value and not '-' in field_value:
        return True

def get_mid_score(sum_of_fields, number_of_fields_with_value):
    if number_of_fields_with_value:
        return sum_of_fields / number_of_fields_with_value
    else:
        return '-'
