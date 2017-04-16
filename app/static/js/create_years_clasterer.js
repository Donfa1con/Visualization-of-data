'use strict'
function create_years_clasterer(myMap, year, schoolSubjectTrends, schoolSubjectTrendsText) {
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

            var getPointData = function (indexSchool) {
                return {
                    balloonContentBody: getBalloonContentBody(indexSchool, schoolSubjectTrends, schoolSubjectTrendsText),

                    clusterCaption: 'метка <strong>' + indexSchool + '</strong>',
                };
            };
        /**
         * Функция возвращает объект, содержащий опции метки.
         * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
            var getPointOptions = function (index) {
                return { 
                    preset: setMarkerColor_for_year(index, ege_data[year], schoolSubjectTrends)
                };
            };
        

            var points = getCoordinates(ege_data[year]);
            var geoObjects = [];

    /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
            for(var index_point = 0, count_geoObjects = 0; index_point < points.length; index_point++) {
                var options = getPointOptions(index_point);
                if (options.preset != "default#lightbluePoint") {
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