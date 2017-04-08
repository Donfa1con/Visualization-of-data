'use strict'
function create_years_clasterer(myMap, year, school_subject_trend) {
    return ymaps.modules.require(['PieChartClusterer'], function (PieChartClusterer) {

            var clusterer = new PieChartClusterer({
            /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            });

            var trend = document.getElementById('button_to_change_trend_header').innerHTML.split(" ", 2);

            var getPointData = function (index) {
                return {
                    balloonContentBody: ege_data[year][index]['Full name'] + 
                                                '<strong><br> ' +  
                                                    trend[0] + ' ' + trend[1] + ' : ' +
                                                    ege_data[year][index][school_subject_trend] +
                                                '</br></strong>',

                    clusterCaption: 'метка <strong>' + index + '</strong>',
                };
            };
        /**
         * Функция возвращает объект, содержащий опции метки.
         * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
            var getPointOptions = function (index) {
                return { 
                    preset: setMarkerColor_for_year(index, ege_data[year], school_subject_trend)
                };
            };
        

            var points = getCoordinates(ege_data[year]);
            var geoObjects = [];

    /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
            for(var index_point = 0, count_geoObjects = 0; index_point < points.length; index_point++) {
                var score = ege_data[year][index_point][school_subject_trend];
                if (score != '-') {
                    geoObjects[count_geoObjects] = new ymaps.Placemark(points[index_point], 
                                                                  getPointData(index_point), 
                                                                  getPointOptions(index_point));
                    count_geoObjects++;
                }
            }

    /**
     * Можно менять опции кластеризатора после создания.
     */
            clusterer.options.set({
                gridSize: 150,
                clusterDisableClickZoom: true,
                minClusterSize : 30
            });

    /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
            clusterer.add(geoObjects);
            myMap.geoObjects.add(clusterer);
    });
}