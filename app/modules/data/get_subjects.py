def execute(cursor, years):
    """
    :param cursor: DB cursor
    :param years: integer year number
    :return: [
        {
            'subject_id',
            'name'
        }
    ]
    """
    years = ', '.join([str(int(year)) for year in years])
    data = cursor.execute('''
      SELECT DISTINCT s.subject_id, s.name FROM subjects s
      LEFT JOIN exam_result er ON s.subject_id= er.subject_id
      WHERE er.year IN (?)
    ''', [years])
    response = [{
                    'subject_id': row['subject_id'],
                    'name': row['name']
                } for row in data]
    return response
