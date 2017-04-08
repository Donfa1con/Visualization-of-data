from python_modules.help_functions import read_csv_file
from python_modules.help_functions import record_to_file
from python_modules.help_functions import get_number
from python_modules.help_functions import is_valid_field_for_mid_score
from python_modules.help_functions import is_valid_field_for_mid_member
from python_modules.help_functions import is_valid_field_for_mid_success
from python_modules.help_functions import get_mid_params
from python_modules.help_functions import set_mid_score_cluster
from python_modules.help_functions import set_mid_member_cluster
from python_modules.help_functions import set_mid_success_cluster
from python_modules.remove_excess import remove_excess_schools_and_keys
from python_modules.remove_excess import remove_schools_with_mid_score_is_zero
from python_modules.yandex_geocoder_requests import load_coordinates_from_yandexMap


def is_valid_key(key):
    if 'amount' in key or 'GPA' in key or 'spravlyaemost' in key:
        return True

def update_school_key(school, key):
    if is_valid_key(key):
        new_key = key.replace('EGE', '')
        new_key = new_key.replace(' ', '')
        new_key = new_key.replace(',', '')
        if school[key] and school[key] != '-':
            school[new_key] = get_number(school[key])
        else:
            school[new_key] = '-'
        del school[key]


def create_similar_keys_for_trends_of_school_subjects(schools_with_exams_by_years):
    for year in schools_with_exams_by_years:
        for school in schools_with_exams_by_years[year]:
            snap_shot_school = school.copy()
            for key in snap_shot_school.keys():
                update_school_key(school, key)
                

def get_schools_for_comaparison(schools_with_exams_by_years):
    schools_for_comaparison = []
    for school_2015 in schools_with_exams_by_years['2015']:
        school_code_2015 = school_2015['Code']
        for school_2016 in schools_with_exams_by_years['2016']:
            school_code_2016 = school_2016['Code']
            if school_code_2015 == school_code_2016:
                schools_for_comaparison.append(school_code_2015)
    return schools_for_comaparison


def get_count_and_value_mid_params(school):
    mid_params = {
            'number_of_fields_with_mid_score' : 0,
            'sum_of_fields_with_mid_score' : 0,
            'number_of_fields_with_mid_member' : 0,
            'sum_of_fields_with_mid_member' : 0,
            'number_of_fields_with_mid_success' : 0,
            'sum_of_fields_with_mid_success' : 0
        }
    for key, field_value in school.items():
        if is_valid_field_for_mid_score(key, field_value):
            mid_params['number_of_fields_with_mid_score'] += 1
            mid_params['sum_of_fields_with_mid_score'] += get_number(field_value)
        if is_valid_field_for_mid_member(key, field_value):
            mid_params['number_of_fields_with_mid_member'] += 1
            mid_params['sum_of_fields_with_mid_member'] += get_number(field_value)
        if is_valid_field_for_mid_success(key, field_value):
            mid_params['number_of_fields_with_mid_success'] += 1
            mid_params['sum_of_fields_with_mid_success'] += get_number(field_value)
    return mid_params


def update_schools_data_to_mid_params(schools_with_exams_by_years):
    schools_zero = set()
    for year in schools_with_exams_by_years:
        for school in schools_with_exams_by_years[year]:
            mid_params = get_count_and_value_mid_params(school)
            mid_score = get_mid_params(mid_params['sum_of_fields_with_mid_score'],
                                       mid_params['number_of_fields_with_mid_score'])
            mid_member = get_mid_params(mid_params['sum_of_fields_with_mid_member'],
                                        mid_params['number_of_fields_with_mid_member'])
            mid_success = get_mid_params(mid_params['sum_of_fields_with_mid_success'],
                                         mid_params['number_of_fields_with_mid_success'])
            if mid_score == '-':
                schools_zero.add(school["Code"])
            extra_params = {
                "amount" : mid_score,
                "GPA" : mid_member,
                "spravlyaemost" : mid_success
            }
            school.update(extra_params)
    remove_schools_with_mid_score_is_zero(schools_with_exams_by_years, schools_zero)


def update_schools_data_to_new_coordinates(schools_with_exams_by_years):
    for year in schools_with_exams_by_years:
        for school in schools_with_exams_by_years[year]:
            coordinates = load_coordinates_from_yandexMap(school['Address'])
            school.update(coordinates)

            
def create_clusters(exams_score_by_years):
    for year in exams_score_by_years:
        for school in exams_score_by_years[year]:
            set_mid_score_cluster(school)
            set_mid_member_cluster(school)
            set_mid_success_cluster(school)


def get_table_data_about_ege_by_years():
    schools_with_exams_2015 = read_csv_file('data/table_csv/data-20160301-structure-20160301.csv')
    schools_with_exams_2016 = read_csv_file('data/table_csv/data-20161027-structure-20161027.csv')
    schools_with_exams_by_years = { "2015" : schools_with_exams_2015,
                                    "2016" : schools_with_exams_2016
                                  }
    schools_for_comaparison = get_schools_for_comaparison(schools_with_exams_by_years)
    remove_excess_schools_and_keys(schools_with_exams_by_years, schools_for_comaparison)
    create_similar_keys_for_trends_of_school_subjects(schools_with_exams_by_years)
    update_schools_data_to_mid_params(schools_with_exams_by_years)   
    update_schools_data_to_new_coordinates(schools_with_exams_by_years)
    create_clusters(schools_with_exams_by_years)
    return schools_with_exams_by_years


if __name__ == '__main__':
    exams_score_by_years = get_table_data_about_ege_by_years()
    record_to_file(exams_score_by_years, 'static/Tables_data.json')



