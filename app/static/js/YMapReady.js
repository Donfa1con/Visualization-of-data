'use strict'
ymaps.ready(function(){
        var myMap = new ymaps.Map('map', {
            center: [57.626569, 39.893787],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        });
        create_clasterer(myMap, '2016');
        create_list_box_layout(myMap);
});