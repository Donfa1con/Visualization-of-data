from app.python_modules.helpers import file


def parse_table(path, subjects_info, year):
    table_data = file.read_csv_file(path)
    school_info = get_school_info(table_data)
    exam_results = get_exam_results_info(table_data, subjects_info, year)
    return {
        'school_info': school_info,
        'exam_results': exam_results,
    }


def get_school_info(table_data):
    school_info = [
        {
            'school_id': school['Code'],
            'name': school['Full name'],
            'address': school['Address'],
            'website': school['Website'],
            'latitude': school['Lat'],
            'longitude': school['Long']
        }
        for school in table_data
        ]
    return school_info


def get_exam_results_info(table_data, subjects_info, year):
    exam_results = []
    for school_info in table_data:
        for subject in subjects_info:
            for exam_type in ['OGE', 'EGE']:
                exam_column = get_exam_column_title(subject['data_name'], exam_type, 'amount')
                if exam_column in school_info:
                    exam_results.append({
                        'school_id': school_info['Code'],
                        'subject_id': subject['id'],
                        'year': year,
                        'exam_type': exam_type,
                        'amount': school_info[
                            get_exam_column_title(
                                subject['data_name'],
                                exam_type,
                                'amount'
                            )
                        ],
                        'gpa': school_info[
                            get_exam_column_title(subject['data_name'], exam_type, 'GPA')
                        ],
                        'success_percent': school_info[
                            get_exam_column_title(
                                subject['data_name'],
                                exam_type,
                                'spravlyaemost'
                            )
                        ],
                    })
    return exam_results


def get_exam_column_title(subject, exam_type, param_type):
    title = "%s,%s %s" % (subject, param_type, exam_type.upper())
    return title
