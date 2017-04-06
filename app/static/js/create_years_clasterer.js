'use strict'
function create_years_clasterer(myMap, years) {
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
        /**
         * Функция возвращает объект, содержащий данные метки.
         * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
         * Поле balloonContentBody - источник данных для контента балуна.
         * Оба поля поддерживают HTML-разметку.
         * Список полей данных, которые используют стандартные макеты содержимого иконки метки
         * и балуна геообъектов, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
            var getPointData = function (index) {
                return {
                    balloonContentBody: ege_data[years][index]['Full name'] + 
                                             '<strong><br> ' + 'Средний балл: ' +
                            ege_data[years][index]['mid_score'] + '</br></strong>',

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
                    preset: setMarkerColor_for_year(index, ege_data[years])
                };
            };
        

            var points = getCoordinates(ege_data[years]);
            var geoObjects = [];

    /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
            for(var index_point = 0; index_point < points.length; index_point++) {
                    geoObjects[index_point] = new ymaps.Placemark(points[index_point], 
                                                                  getPointData(index_point), 
                                                                  getPointOptions(index_point));
            }

    /**
     * Можно менять опции кластеризатора после создания.
     */
            clusterer.options.set({
                gridSize: 150,
                clusterDisableClickZoom: true,
                minClusterSize : 3
            });

    /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
            clusterer.add(geoObjects);
            myMap.geoObjects.add(clusterer);
    });

}