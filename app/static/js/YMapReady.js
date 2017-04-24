'use strict'
ymaps.ready(function(){
        var myMap = new ymaps.Map('map', {
            center: [57.626569, 39.893787],
            zoom: 7,
            behaviors: ['default', 'scrollZoom'],
            controls: ['zoomControl']
        }, {
            suppressMapOpenBlock: true
        });

        create_button_help_tips (myMap);
        create_button_side_panel (myMap);
        create_button_checkbox (myMap);
});