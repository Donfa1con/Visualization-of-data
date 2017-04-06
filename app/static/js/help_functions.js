'use strict'
function getCoordinates(ege) {
    var point = [];
    for(var index = 0; index < ege.length; index++) {
        	point.push([ege[index].Lat, ege[index].Long]);
    }
    return point;
};

function setMarkerColor_for_year(index, ege_data_current_year) {
    if (ege_data_current_year[index]['cluster'] == 'one') {
        return 'islands#darkGreenDotIcon';
    } else if (ege_data_current_year[index]['cluster'] == 'two') {
        return 'islands#greenDotIcon';
    } else if (ege_data_current_year[index]['cluster'] == 'three') {
        return 'islands#darkOrangeDotIcon';
    } else if (ege_data_current_year[index]['cluster'] == 'four') {
        return 'islands#redDotIcon';
    }
};

function setMarkerColor_for_trends(index, ege_trends, school_subject_trend) {
    if (ege_trends[index][school_subject_trend] > 0) {
        return 'islands#darkGreenDotIcon';
    } else if (ege_trends[index][school_subject_trend] < 0) {
        return 'islands#redDotIcon';
    }
};