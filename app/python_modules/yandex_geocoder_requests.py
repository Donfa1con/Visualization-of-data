import requests
import json

def load_coordinates_from_yandexMap(text):
    url = 'https://geocode-maps.yandex.ru/1.x/?'
    addres = text
    params = {
            'geocode' : addres,
            'format' : 'json',
            'results' : 1
    }
    data = json.loads(requests.get(url, params=params).text)
    data = data['response']['GeoObjectCollection']['featureMember']
    point = data[0]['GeoObject']['Point']['pos']
    coordinates = {
                    'Lat' : float(point.split()[1]),
                    'Long' : float(point.split()[0])
                  }
    return coordinates
