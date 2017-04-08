'use strict'
function create_button_checkbox (myMap) {
    
    var ButtonLayout = ymaps.templateLayoutFactory.createClass([
        '<input type="checkbox" id="CheckBox" class="checkbox">',
        '<label for="CheckBox">Показывать шкоы, у которых тренд не изменился</label>',
        ].join('')),

    CheckBox = new ymaps.control.Button({
            data: {
                content : false
            },
            options: {
                layout: ButtonLayout,
            }
        });
    var count_click = 0;
    CheckBox.events.add('click', function () {     
            count_click++;
            if (count_click % 2) {
                myMap.geoObjects.removeAll();

                if (CheckBox.data.get('content')) {
                    CheckBox.data.set('content', false);
                    STEALF = false;
                    createMarker(myMap);
                } else {
                    CheckBox.data.set('content', true);
                    STEALF = true;
                    createMarker(myMap);
                }
            }
        });


    myMap.controls.add(CheckBox, {float: 'left'});
}