from importlib import import_module


def get_cluster_id(score, trend=None):
    try:
        trend_module = import_module(trend, 'app.modules.trends')
    except ModuleNotFoundError:
        trend_module = import_module('default', 'app.modules.trends')
    clusters = trend_module.get_clusters()
    trend_name = trend_module.get_name()
    cluster_id = len(clusters)
    for id, bottom_line in enumerate(clusters):
        if score >= bottom_line:
            cluster_id = id
            break
    return {
        'name': trend_name,
        'id': cluster_id
    }


def get_list():
    trends = [
        'amount',
        'gpa',
        'success_percent'
    ]
    trend_list = {}
    for trend in trends:
        trend_module = import_module('app.modules.trends.' + trend)
        trend_list[trend] = trend_module.get_name()
    return trend_list
