from app.modules.trends import trends


def execute(cursor, years, subjects, exam_types, trend):
    """
    :param cursor: DB cursor
    :param years: list of years
    :param subjects: list of subject ids
    :param exam_types: list of exam type names
    :param trend: trend name
    :return: [
        {
            'school_id',
            'name',
            'latitude',
            'longitude',
            'score'
        }
    ]
    """
    if trend not in trends.get_list().keys():
        raise ValueError('Trend {%s} is not exist' % trend)
    schools = cursor.execute('''
            SELECT
              s.school_id    school_id,
              s.name         name,
              s.latitude     latitude,
              s.longitude    longitude,
              AVG(er.%s) score
            FROM schools s
              JOIN exam_result er ON s.school_id = er.school_id
            WHERE er.amount != '-'
              AND er.year IN (?)
              AND er.subject_id IN (?)
              AND er.exam_type IN (?)
            GROUP BY s.school_id
        ''' % trend, [
        ', '.join(years),
        ', '.join(subjects),
        ', '.join(exam_types)
    ])
    response = [{
                    'school_id': school['school_id'],
                    'name': school['name'],
                    'latitude': school['latitude'],
                    'longitude': school['longitude'],
                    'score': school['score']
                } for school in schools]
    return response
