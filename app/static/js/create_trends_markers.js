'use strict'
function create_trends_markers(myMap, school_subject_trend) {

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
            preset: setMarkerColor_for_trends(index, school_subject_trend)
        };
    };
    
    var points = getCoordinates(ege_trends);

    for(var index_point = 0; index_point < points.length; index_point++) {
        var score = ege_trends[index_point][school_subject_trend];
        if (SHOW_ELEMENTS){
            if (score != '-') {
                myMap.geoObjects.add( new ymaps.Placemark(points[index_point], 
                                                    getPointData(index_point), 
                                                    getPointOptions(index_point))
                                    );
            }
        } else {
            if (score != '-' && score != 0) {
                myMap.geoObjects.add( new ymaps.Placemark(points[index_point], 
                                                    getPointData(index_point), 
                                                    getPointOptions(index_point))
                                    );
            }
        }
    }
}