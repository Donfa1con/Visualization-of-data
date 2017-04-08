from python_modules.help_functions import read_the_file
from python_modules.help_functions import record_to_file
from python_modules.help_functions import get_number


def is_valid_key(key):
    if 'amount' in key or 'GPA' in key or 'spravlyaemost' in key:
        return True

def is_valid_value(school_2015, school_2016, key):
    not_valid_values = '-'
    for not_valid_value in not_valid_values:
        if school_2015[key] == not_valid_value:
            return False
        if school_2016[key] == not_valid_value:
            return False
    return True


def create_trends(school_2015, school_2016):
    for key in school_2016.keys():
        if is_valid_key(key):
            if is_valid_value(school_2015, school_2016, key):
                school_2016[key] -= school_2015[key]
                school_2016[key] = round(school_2016[key], 2)
            else:
                school_2016[key] = '-'


def get_trends_of_school_subjects(tables_data_from_json):
    schools = []
    for school_2016 in tables_data_from_json['2015']:
        for school_2015 in tables_data_from_json['2016']:
            if school_2015['Code'] == school_2016['Code']:
                create_trends(school_2015, school_2016)
        schools.append(school_2016)
    return schools


if __name__ == '__main__':
    tables_data_from_json = read_the_file('static/Tables_data.json')
    schools_with_trends = get_trends_of_school_subjects(tables_data_from_json)
    record_to_file(schools_with_trends, 'static/School_trends.json')



