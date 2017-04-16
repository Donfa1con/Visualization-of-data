'use strict'
function create_trends_markers(myMap, schoolSubjectTrends, schoolSubjectTrendsText) {

    var getPointData = function (index) {
        return {
            balloonContentBody: getBalloonContentBody(index, schoolSubjectTrends, schoolSubjectTrendsText),

            clusterCaption: 'метка <strong>' + index + '</strong>',
        };
    };

    
    var getPointOptions = function (index) {
        return { 
            preset: setMarkerColor_for_trends(index, schoolSubjectTrends)
        };
    };
    
    var points = getCoordinates(ege_trends);
    for(var index_point = 0; index_point < points.length; index_point++) {
        if (getPointOptions(index_point).preset != "default#lightbluePoint") {
            if (!$('.checkbox').prop('checked')) {
                if (getPointOptions(index_point).preset != 'islands#blueCircleDotIcon'){
                    myMap.geoObjects.add( new ymaps.Placemark(points[index_point], 
                                                        getPointData(index_point), 
                                                        getPointOptions(index_point))
                                        );
                }
            } else {
                myMap.geoObjects.add( new ymaps.Placemark(points[index_point], 
                                                    getPointData(index_point), 
                                                    getPointOptions(index_point))
                                    );
            }
        }
    }
}