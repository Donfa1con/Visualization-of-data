def execute(cursor, years, subjects):
    """
    :param cursor: DB cursor
    :type cursor: sqlite3.cursor
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
    schools = cursor.execute('''
        SELECT
            s.school_id school_id,
            s.name name,
            s.latitude latitude,
            s.longitude longitude,
            0 score
        FROM schools s
    ''')
    response = [{
                    'school_id': school['school_id'],
                    'name': school['name'],
                    'latitude': school['latitude'],
                    'longitude': school['longitude'],
                    'score': 0
                } for school in schools]
    return response
