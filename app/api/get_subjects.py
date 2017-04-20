def execute(cursor, year):
    """
    :param cursor: DB cursor
    :param year: integer year number
    :return: [
        {
            'subject_id',
            'name'
        }
    ]
    """
    data = cursor.execute('''
      SELECT DISTINCT s.subject_id, s.name FROM subjects s
      LEFT JOIN exam_result er ON s.subject_id= er.subject_id
      WHERE er.year = ?
    ''', [year])
    response = [{
                    'subject_id': row['subject_id'],
                    'name': row['name']
                } for row in data]
    return response
