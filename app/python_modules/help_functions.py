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


def is_valid_field_for_mid_score(key, field_value):
    if 'GPA' in key and field_value and '-' != field_value:
        return True
    
def is_valid_field_for_mid_member(key, field_value):
    if 'amount' in key and field_value and '-' != field_value:
        return True
    
def is_valid_field_for_mid_success(key, field_value):
    if 'spravlyaemost' in key and field_value and  '-' != field_value:
        return True


def get_mid_params(sum_of_fields, number_of_fields_with_value):
    if number_of_fields_with_value:
        return round(sum_of_fields / number_of_fields_with_value, 2)
    else:
        return '-'


def set_mid_score_cluster(school):
    cluster_mid_score_one = 65
    cluster_mid_score_two = 55
    cluster_mid_score_three = 45
    snap_shot_school = school.copy()
    for key in snap_shot_school:
        if "GPA" in key:
            new_key = key + "cluster"
            if school[key] == '-':
                extra_params = { new_key : 'five' }
            elif school[key] >= cluster_mid_score_one:
                extra_params = { new_key : 'one' }
            elif school[key] >= cluster_mid_score_two:
                extra_params = { new_key : 'two' }
            elif school[key] >= cluster_mid_score_three:
                extra_params = { new_key : 'three' }
            else:
                extra_params = { new_key : 'four' }
            school.update(extra_params)


def set_mid_member_cluster(school):
    cluster_mid_member_one = 20
    cluster_mid_member_two = 15
    cluster_mid_member_three = 10
    snap_shot_school = school.copy()
    for key in snap_shot_school:
        if "amount" in key:
            new_key = key + "cluster"
            if school[key] == '-':
                extra_params = { new_key : 'five' }
            elif school[key] >= cluster_mid_member_one:
                extra_params = { new_key : 'one' }
            elif school[key] >= cluster_mid_member_two:
                extra_params = { new_key : 'two' }
            elif school[key] >= cluster_mid_member_three:
                extra_params = { new_key : 'three' }
            else:
                extra_params = { new_key : 'four' }
            school.update(extra_params)


def set_mid_success_cluster(school):
    cluster_mid_success_one = 100
    cluster_mid_success_two = 85
    cluster_mid_success_three = 70
    snap_shot_school = school.copy()
    for key in snap_shot_school:
        if "spravlyaemost" in key:
            new_key = key + "cluster"
            if school[key] == '-':
                extra_params = { new_key : 'five' }
            elif school[key] >= cluster_mid_success_one:
                extra_params = { new_key : 'one' }
            elif school[key] >= cluster_mid_success_two:
                extra_params = { new_key : 'two' }
            elif school[key] >= cluster_mid_success_three:
                extra_params = { new_key : 'three' }
            else:
                extra_params = { new_key : 'four' }
            school.update(extra_params)

'''
def is_valid_school_subject_key(key):
    if 'spravlyaemost' in key or 'GPA' in key or 'amount' in key:
        if 'spravlyaemost' != key and 'GPA' != key and 'amount' != key:
            return True
'''
'''
def set_school_subject_cluster(school):
    cluster_mid_success_one = 75
    cluster_mid_success_two = 60
    cluster_mid_success_three = 45
    snap_shot_school = school.copy()
    for key in snap_shot_school:
        if is_valid_school_subject_key(key):
            new_key = key + "cluster"
            if school[key] == '-':
                extra_params = { new_key : 'five' }
            elif school[key] >= cluster_mid_success_one:
                extra_params = { new_key : 'one' }
            elif school[key] >= cluster_mid_success_two:
                extra_params = { new_key : 'two' }
            elif school[key] >= cluster_mid_success_three:
                extra_params = { new_key : 'three' }
            else:
                extra_params = { new_key : 'four' }   
            school.update(extra_params)
'''
