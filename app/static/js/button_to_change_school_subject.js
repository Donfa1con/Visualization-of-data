'use strict'
function create_button_to_change_school_subject (myMap) {

        var ListBoxLayout = ymaps.templateLayoutFactory.createClass(
            "<button id='button_to_change_school_subject_header' class='btn btn-success dropdown-toggle' data-toggle='dropdown'>" +
                "{{data.title}} <span class='caret'></span>" +
            "</button>" +
            "<ul id='button_to_change_school_subject'" +
                " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
                " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

            build: function() {
                ListBoxLayout.superclass.build.call(this);

                this.childContainerElement = $('#button_to_change_school_subject').get(0);
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: this.childContainerElement,
                    oldChildContainerElement: null
                });
            },

            getChildContainerElement: function () {
                return this.childContainerElement;
            },

            clear: function () {
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: null,
                    oldChildContainerElement: this.childContainerElement
                });
                this.childContainerElement = null;
                ListBoxLayout.superclass.clear.call(this);
            }
        }),

        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.content}}</a></li>"
        ),

        listBoxItems = [];
        var school_subject = ['Сбросить','Русский язык','Математика','Физика','Химия','Биология',
                        'География','Информатика','Литература','История','Обществознание',
                        'Английский язык','Обязательные предметы (2)','Все предметы'];
        for(var index = 0; index < school_subject.length; ++index ) {
            listBoxItems.push(new ymaps.control.ListBoxItem({
                                    data: {
                                            content: school_subject[index],
                                            }
                            }));
        }

        var listBox = new ymaps.control.ListBox({
                items: listBoxItems,
                data: {
                    title: 'Все предметы'
                },
                options: {
                    layout: ListBoxLayout,
                    itemLayout: ListBoxItemLayout
                }
        });

        listBox.events.add('click', function (field) {
            var item = field.get('target');
            
            if (item != listBox) {
                myMap.geoObjects.removeAll();
                listBox.collapse();

                if (item.data.get('content') == 'Сбросить') {
                    listBox.data.set('title', 'Выберите предмет');
                } else {
                    listBox.data.set('title', item.data.get('content'));
                    createMarker(myMap);
                }
            }
        });
    myMap.controls.add(listBox, {float: 'left'});
}