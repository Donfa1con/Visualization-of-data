def execute(cursor):
    """
    :param cursor: DB cursor
    :return: list of years
    """
    data = cursor.execute('SELECT DISTINCT exam_type FROM exam_result')
    response = [row['exam_type'] for row in data]
    return response
