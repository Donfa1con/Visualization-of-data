'use strict'
function create_button_checkbox (myMap) {
    
    var ButtonLayout = ymaps.templateLayoutFactory.createClass([
        '<input type="checkbox" id="CheckBox" class="checkbox">',
        '<label for="CheckBox">Показывать школы, у которых тренд не изменился</label>',
        ].join('')),

    CheckBox = new ymaps.control.Button({
            options: {
                layout: ButtonLayout,
            }
        });

    $(document).ready(function(){
        $(document).on('change','.checkbox', function(){
            myMap.geoObjects.removeAll();
        if( $(this).is(':checked') ) {
            SHOW_ELEMENTS = true;
            createMarker(myMap);
        } else {
            SHOW_ELEMENTS = false;
            createMarker(myMap);
        };
        });
    });

    myMap.controls.add(CheckBox, {float: 'left'});
}