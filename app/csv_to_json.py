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
    
def get_number(field_value):
    if ',' in field_value:
        score = field_value.split(',')
        float_number = int(score[0]) + int(score[1]) / 100
        return float_number
    return int(field_value)

def is_valid_field(key, field_value):
    if 'GPA' in key and not "OGE" in key and field_value and not '-' in field_value:
        return True

def get_mid_score(sum_of_fields, number_of_fields_with_value):
    if number_of_fields_with_value:
        return sum_of_fields / number_of_fields_with_value
    else:
        return '-'
    

def update_schools_data_to_mid_score(exams_score_by_years):
    for year in exams_score_by_years:
        for school in exams_score_by_years[year]:
            number_of_fields_with_value = 0
            sum_of_fields = 0
            for key, field_value in school.items():
                if is_valid_field(key, field_value):
                    number_of_fields_with_value += 1
                    sum_of_fields += get_number(field_value)
            mid_score = get_mid_score(sum_of_fields, number_of_fields_with_value)
            extra_params = {
                "mid_score" : mid_score,
            }
            school.update(extra_params)

def create_clusters(exams_score_by_years):
    cluster_index_one = 60
    cluster_index_two = 50
    cluster_index_three = 40
    for year in exams_score_by_years:
        for school in exams_score_by_years[year]:
            if school["mid_score"] == '-':
                extra_params = { "cluster" : 'other' }
            elif school["mid_score"] >= cluster_index_one:
                extra_params = { "cluster" : 'one' }
            elif school["mid_score"] >= cluster_index_two:
                extra_params = { "cluster" : 'two' }
            elif school["mid_score"] >= cluster_index_three:
                extra_params = { "cluster" : 'three' }
            else:
                extra_params = { "cluster" : 'four' }
            school.update(extra_params)        

def get_table_data_about_ege_by_years():
    school_with_exams_2015 = read_csv_file('data/table_csv/data-20160301-structure-20160301.csv')
    school_with_exams_2016 = read_csv_file('data/table_csv/data-20161027-structure-20161027.csv')
    school_with_exams__by_years = { "2015" : school_with_exams_2015,
                                    "2016" : school_with_exams_2016
                                  }
    update_schools_data_to_mid_score(school_with_exams__by_years)
    create_clusters(school_with_exams__by_years)
    return school_with_exams__by_years

if __name__ == '__main__':
    exams_score_by_years = get_table_data_about_ege_by_years()
    record_to_file(exams_score_by_years, 'static/Tables_data.json')




