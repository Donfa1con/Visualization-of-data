from app.modules.trends import trends


def execute(cursor):
    """
    :param cursor: DB cursor
    :return: [
        {
            'name',
            'title'
        }
    ]
    """
    response = [{
                    'name': name,
                    'title': title
                } for name, title in trends.get_list().items()]
    return response
