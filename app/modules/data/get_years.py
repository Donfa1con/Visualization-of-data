def execute(cursor):
    """
    :param cursor: DB cursor
    :return: list of years
    """
    data = cursor.execute('SELECT DISTINCT year FROM exam_result')
    response = [row['year'] for row in data]
    return response
