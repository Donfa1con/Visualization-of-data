# Visualization-of-data
## Визуализация результатов ЕГЭ в Ярославской области с помощью Яндекс.карт

### Для запуска нужно:
Запустить скрипт run.py и перейти по ссылке.
***
* /app/templates/ <br>Содержит шаблон HTML</br>
* /app/ <br>Скрипт **csv_to_json.py** для передачи данных из csv таблиц в Tables_data.json.</br>
Считает для каждой школы средний балл по всем предметам за ЕГЭ ('mid_score'). Делит школы на 5 групп:
1. 'mid_score' >= 60.
2. 50 <='mid_score' <= 60.
3. 40 <= 'mid_score' <= 50.
4. 'mid_score' < 40.
5. 'mid_score' == '-' (для тех школ, где приведены только результаты ГИА).

* /app/static/js/ <br>**list_box_layout.js** - кнопка для выбора года</br> 
                  **clusterer_create.js** - функция добавления меток и создания кластеров на Яндекс.карте.
                  Добавляет только школы с результатами ЕГЭ.
                  <br>**help_functions.js** - функции для clusterer_create.js. Присваивает каждой группе школ свой цвет(от зеленого до красного).</br>
                  **YMapReady.js** - создание карты 
* /app/static/js/lib/ <br>**ymaps-pie-chart-clusterer.js** - библиотека для PieChartClusterer от https://github.com/yandex/ymaps-pie-chart-clusterer</br>
