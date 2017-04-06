from python_modules.help_functions import read_the_file
from python_modules.help_functions import record_to_file
from python_modules.help_functions import get_number


def is_valid_key(key):
    if 'amount' in key or 'GPA' in key or 'spravlyaemost' in key or 'mid_score' in key:
        return True

def is_valid_value(school_2015, school_2016, key):
    not_valid_values = ['0','-', 0]
    for not_valid_value in not_valid_values:
        if school_2015[key] == not_valid_value:
            return False
        if school_2016[key] == not_valid_value:
            return False
    return True

def update_school_key(school, key):
    if is_valid_key(key):
        new_key = key.replace('EGE', '')
        new_key = new_key.replace(' ', '')
        new_key = new_key.replace(',', '_')
        new_key += '_trend'
        if school[key] and school[key] != '-':
            school[new_key] = get_number(school[key])
        else:
            school[new_key] = '-'
        del school[key]

def create_similar_keys_for_trends_of_school_subjects(tables_data_from_json):
    for year in tables_data_from_json:
        for school in tables_data_from_json[year]:
            snap_shot_school = school.copy()
            for key in snap_shot_school.keys():
                update_school_key(school, key)


def create_trends(school_2015, school_2016):
    for key in school_2016.keys():
        if is_valid_key(key):
            if is_valid_value(school_2015, school_2016, key):
                school_2016[key] -= school_2015[key]
            else:
                school_2016[key] = '-'


def create_trends_of_school_subjects(tables_data_from_json):
    schools = []
    for school_2016 in tables_data_from_json['2015']:
        for school_2015 in tables_data_from_json['2016']:
            if school_2015['Code'] == school_2016['Code']:
                create_trends(school_2015, school_2016)
        schools.append(school_2016)
    return schools


if __name__ == '__main__':
    tables_data_from_json = read_the_file('static/Tables_data.json')
    create_similar_keys_for_trends_of_school_subjects(tables_data_from_json)
    schools_with_trends = create_trends_of_school_subjects(tables_data_from_json)
    record_to_file(schools_with_trends, 'static/School_trends.json')



