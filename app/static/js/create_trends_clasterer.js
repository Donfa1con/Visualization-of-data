'use strict'
function create_trends_clasterer(myMap, school_subject, trend) {
  return ymaps.modules.require(['PieChartClusterer'], function (PieChartClusterer) {
    var clusterer = new PieChartClusterer({
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
        });

    var school_subject_and_trands = ['Русский','Математика','Физика','Химия',
                                    'Биология','География','Информатика','Литература',
                                    'История','Обществознание','Английский',
                                    'Все','Количество','Средний', 'Справляемость'];

    var translator_school_subject_and_trands = ['Russianlanguage','Mathematicsprofil',
                                            'Physics','Chemistry','Biology','Geography',
                                            'Computerscience','Literature','History',
                                            'SocialStudies','English','mid_score',
                                            'amount', 'GPA','spravlyaemost'];
    var similar_dict = {}
    for (var index = 0; index < school_subject_and_trands.length; ++index) {
        var subject_or_trands = school_subject_and_trands[index]
        var translator_subject_or_trands = translator_school_subject_and_trands[index]
        similar_dict[subject_or_trands] = translator_subject_or_trands
    }

    var school_subject_trend = similar_dict[school_subject] +'_' + similar_dict[trend] + '_trend'
    console.log(school_subject_trend)
    var getPointData = function (index) {
        return {
            balloonContentBody: ege_trends[index]['Full name'] + 
                                     '<strong><br> ' + 'Тренд изменился на: ' +
                    ege_trends[index][school_subject_trend] + '</br></strong>',

            clusterCaption: 'метка <strong>' + index + '</strong>',
        };
    };

    
    var getPointOptions = function (index) {
        return { 
            preset: setMarkerColor_for_trends(index, ege_trends, school_subject_trend)
        };
    };
    
    var points = getCoordinates(ege_trends);
    var geoObjects = [];

    for(var index_point = 0, count_geoObjects = 0; index_point < points.length; index_point++) {
        var score = ege_trends[index_point][school_subject_trend];
        if (score != 0 && score != '-') {
            geoObjects[count_geoObjects] = new ymaps.Placemark(points[index_point], 
                                                          getPointData(index_point), 
                                                          getPointOptions(index_point));
            count_geoObjects++;
        }
    }

    clusterer.options.set({
                gridSize: 150,
                clusterDisableClickZoom: true,
                minClusterSize : 204
            });


    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);
  });
}