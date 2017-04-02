'use strict'
function getCoordinates(ege_data_current_year) {
    var point = [];
    for(var index = 0; index < ege_data_current_year.length; index++) {
        	point.push([ege_data_current_year[index].Lat, ege_data_current_year[index].Long]);
    }
    return point;
};

function setMarkerColor(index, ege_data_current_year) {
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