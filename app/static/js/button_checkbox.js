'use strict'
function create_button_checkbox (myMap) {
    
    var ButtonLayout = ymaps.templateLayoutFactory.createClass([
        '<input type="checkbox" id="CheckBox" class="checkbox">',
        '<label id="bigCheckBox" class="mylabel" for="CheckBox"  style="display: none">Показывать школы, у которых тренд не изменился</label>',
        ].join('')),

    CheckBox = new ymaps.control.Button({
            options: {
                layout: ButtonLayout,
            }
        });

    $(document).ready(function(){
        $(document).on('change','.checkbox', function(){
            myMap.geoObjects.removeAll();
            createMarker(myMap);
        });
    });

    myMap.controls.add(CheckBox, {float: 'left'});
}