from importlib import import_module


def get_cluster_id(score, trend=None):
    try:
        trend_module = import_module(trend, 'app.python_modules.trends')
    except ModuleNotFoundError:
        trend_module = import_module('default', 'app.python_modules.trends')
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
