def execute(cursor):
    """
    :param cursor: DB cursor
    :type cursor: sqlite3.cursor
    :return: [
        {
            'school_id',
            'name',
            'latitude',
            'longitude'
        }
    ]
    """
    schools = cursor.execute('SELECT * FROM schools')
    response = [{
                    'school_id': school['school_id'],
                    'name': school['name'],
                    'latitude': school['latitude'],
                    'longitude': school['longitude']
                } for school in schools]
    return response
