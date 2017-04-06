'use strict'
function button_to_change_trend (myMap) {

        // Создадим собственный макет выпадающего списка.
        var ListBoxLayout = ymaps.templateLayoutFactory.createClass(
            "<button id='button_to_change_trend_header' class='btn btn-success dropdown-toggle' data-toggle='dropdown'>" +
                "{{data.title}} <span class='caret'></span>" +
            "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
            "<ul id='button_to_change_trend'" +
                " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
                " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

            build: function() {
                // Вызываем метод build родительского класса перед выполнением
                // дополнительных действий.
                ListBoxLayout.superclass.build.call(this);

                this.childContainerElement = $('#button_to_change_trend').get(0);
                // Генерируем специальное событие, оповещающее элемент управления
                // о смене контейнера дочерних элементов.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: this.childContainerElement,
                    oldChildContainerElement: null
                });
            },

            // Переопределяем интерфейсный метод, возвращающий ссылку на
            // контейнер дочерних элементов.
            getChildContainerElement: function () {
                return this.childContainerElement;
            },

            clear: function () {
                // Заставим элемент управления перед очисткой макета
                // откреплять дочерние элементы от родительского.
                // Это защитит нас от неожиданных ошибок,
                // связанных с уничтожением dom-элементов в ранних версиях ie.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: null,
                    oldChildContainerElement: this.childContainerElement
                });
                this.childContainerElement = null;
                // Вызываем метод clear родительского класса после выполнения
                // дополнительных действий.
                ListBoxLayout.superclass.clear.call(this);
            }
        }),

        // Также создадим макет для отдельного элемента списка.
        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.content}}</a></li>"
        ),

        // Создадим 2 пункта выпадающего списка
        listBoxItems = [];
        var school_subject = ['Количество участников', 'Средний балл', 'Справляемость участников'];
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
                    title: 'Выберите тренд'
                },
                options: {
                    // С помощью опций можно задать как макет непосредственно для списка,
                    layout: ListBoxLayout,
                    // так и макет для дочерних элементов списка. Для задания опций дочерних
                    // элементов через родительский элемент необходимо добавлять префикс
                    // 'item' к названиям опций.
                    itemLayout: ListBoxItemLayout
                }
        });

        listBox.events.add('click', function (field) {
            // Получаем ссылку на объект, по которому кликнули.
            // События элементов списка пропагируются
            // и их можно слушать на родительском элементе.
            var item = field.get('target');
            // Клик на заголовке выпадающего списка обрабатывать не надо.
            
            if (item != listBox) {
                var school_subject = document.getElementById('button_to_change_school_subject_header').innerHTML.split(" ")[0];
                listBox.data.set('title', item.data.get('content'));               
                if (school_subject != 'Выберите') {
                    myMap.geoObjects.removeAll();


                    console.log(school_subject, item.data.get('content').split(" ")[0]);
                    create_trends_clasterer(myMap, school_subject, item.data.get('content').split(" ")[0]);
                }
            }
        });
    myMap.controls.add(listBox, {float: 'left'});
}
