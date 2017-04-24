'use strict'
function createMarker(myMap) {
    myMap.geoObjects.removeAll();
    var year = $("input:radio[name='group1']:checked").val();

    if (year == '2015-2016') {
        create_trends_markers(myMap);
    }

    if (year == '2015' || year == '2016') {
    	$('#bigCheckBox').hide(0);
        create_years_clasterer(myMap);
    }
};

