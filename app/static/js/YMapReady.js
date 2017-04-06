'use strict'
ymaps.ready(function(){
        var myMap = new ymaps.Map('map', {
            center: [57.626569, 39.893787],
            zoom: 7,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        });

        button_to_change_trend (myMap)
        button_to_change_school_subject(myMap);
        create_button_to_change_years(myMap);
});