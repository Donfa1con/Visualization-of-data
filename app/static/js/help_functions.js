'use strict'
function createMarker(myMap) {
    $('#bigCheckBox').hide(0);
    var year = $("input:radio[name='group1']:checked").val();
    var trend = $("input:radio[name='group2']:checked").val();
    var schoolSubjectTrends = [];
    var schoolSubjectTrendsText = [];

    $("input:checkbox:checked").not('#сompulsion').not('#choosingly').not('.checkbox').each(function() {
        schoolSubjectTrends.push($(this).val() + trend);
        schoolSubjectTrendsText.push($(this).next("label").text());
    });

    if (year == '2015-2016' && schoolSubjectTrends.length != 0) {
        create_trends_markers(myMap, schoolSubjectTrends, schoolSubjectTrendsText);
    }
    if ((year == '2015' || year == '2016') && schoolSubjectTrends.length != 0) {
        create_years_clasterer(myMap, year, schoolSubjectTrends, schoolSubjectTrendsText);
    }
};


function setMarkerColor_for_trends(index, schoolSubjectTrends) {
    var redFlag = false,
        greenFlag = false,
        grayFlag = false,
        sumTrend = 0,
        countTrends = 0;

    for (var i = 0; i < schoolSubjectTrends.length; i++) {
        if (ege_trends[index][schoolSubjectTrends[i]] > 0) {
            greenFlag = true;
            sumTrend += ege_trends[index][schoolSubjectTrends[i]];
            countTrends++;
        } else if (ege_trends[index][schoolSubjectTrends[i]] < 0) {
            redFlag = true;
            sumTrend += ege_trends[index][schoolSubjectTrends[i]];
            countTrends++;
        } else if (ege_trends[index][schoolSubjectTrends[i]] != '-'){
            grayFlag = true;
            sumTrend += ege_trends[index][schoolSubjectTrends[i]];
            countTrends++;
        }
    }

    if (sumTrend == 0 && countTrends != 0) {
        $('#bigCheckBox').show();
        return 'islands#blueCircleDotIcon';
    } else if (!redFlag && greenFlag) {
        return 'islands#darkGreenCircleDotIcon';
    } else if (redFlag && !greenFlag) {
        return 'islands#redCircleDotIcon';
    } else if (grayFlag || (redFlag && greenFlag)){
        return 'islands#grayCircleDotIcon';
    } else {
        return "default#lightbluePoint"
    }
};

