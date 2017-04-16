import json

import requests


def get_coords_from_address(address):
    url = 'https://geocode-maps.yandex.ru/1.x/?'
    params = {
        'geocode': address,
        'format': 'json',
        'results': 1
    }
    data = json.loads(requests.get(url, params=params).text)
    points = data['response']['GeoObjectCollection']['featureMember']
    point = points[0]['GeoObject']['Point']['pos']
    coordinates = {
        'latitude': float(point.split()[1]),
        'longitude': float(point.split()[0])
    }
    return coordinates
