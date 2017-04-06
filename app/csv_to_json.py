from python_modules.help_functions import read_csv_file
from python_modules.help_functions import record_to_file
from python_modules.help_functions import get_number
from python_modules.help_functions import is_valid_field
from python_modules.help_functions import get_mid_score
from python_modules.remove_excess import remove_excess_schools_and_keys
from python_modules.remove_excess import remove_schools_with_mid_score_is_zero
from python_modules.yandex_geocoder_requests import load_coordinates_from_yandexMap


def get_schools_for_comaparison(schools_with_exams_by_years):
    schools_for_comaparison = []
    for school_2015 in schools_with_exams_by_years['2015']:
        school_code_2015 = school_2015['Code']
        for school_2016 in schools_with_exams_by_years['2016']:
            school_code_2016 = school_2016['Code']
            if school_code_2015 == school_code_2016:
                schools_for_comaparison.append(school_code_2015)
    return schools_for_comaparison          

def update_schools_data_to_mid_score(schools_with_exams_by_years):
    schools_zero = set()
    for year in schools_with_exams_by_years:
        for school in schools_with_exams_by_years[year]:
            number_of_fields_with_value = 0
            sum_of_fields = 0
            for key, field_value in school.items():
                if is_valid_field(key, field_value):
                    number_of_fields_with_value += 1
                    sum_of_fields += get_number(field_value)
            mid_score = get_mid_score(sum_of_fields, number_of_fields_with_value)
            if not mid_score:
                schools_zero.add(school["Code"])
            extra_params = {
                "mid_score" : mid_score,
            }
            school.update(extra_params)
    remove_schools_with_mid_score_is_zero(schools_with_exams_by_years, schools_zero)

def update_schools_data_to_new_coordinates(schools_with_exams_by_years):
    for year in schools_with_exams_by_years:
        for school in schools_with_exams_by_years[year]:
            coordinates = load_coordinates_from_yandexMap(school['Address'])
            school.update(coordinates)
    

def create_clusters(exams_score_by_years):
    cluster_index_one = 65
    cluster_index_two = 55
    cluster_index_three = 45
    for year in exams_score_by_years:
        for school in exams_score_by_years[year]:
            if school["mid_score"] >= cluster_index_one:
                extra_params = { "cluster" : 'one' }
            elif school["mid_score"] >= cluster_index_two:
                extra_params = { "cluster" : 'two' }
            elif school["mid_score"] >= cluster_index_three:
                extra_params = { "cluster" : 'three' }
            else:
                extra_params = { "cluster" : 'four' }
            school.update(extra_params)        


def get_table_data_about_ege_by_years():
    schools_with_exams_2015 = read_csv_file('data/table_csv/data-20160301-structure-20160301.csv')
    schools_with_exams_2016 = read_csv_file('data/table_csv/data-20161027-structure-20161027.csv')
    schools_with_exams_by_years = { "2015" : schools_with_exams_2015,
                                    "2016" : schools_with_exams_2016
                                  }
    schools_for_comaparison = get_schools_for_comaparison(schools_with_exams_by_years)
    remove_excess_schools_and_keys(schools_with_exams_by_years, schools_for_comaparison)
    update_schools_data_to_mid_score(schools_with_exams_by_years)
    update_schools_data_to_new_coordinates(schools_with_exams_by_years)
    create_clusters(schools_with_exams_by_years)
    return schools_with_exams_by_years

if __name__ == '__main__':
    exams_score_by_years = get_table_data_about_ege_by_years()
    record_to_file(exams_score_by_years, 'static/Tables_data.json')



