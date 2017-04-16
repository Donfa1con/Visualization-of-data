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

    if ( year === undefined) {
        year = '2015-2016';
        trend = 'GPA';
        schoolSubjectTrends = ["RussianlanguageGPA", "MathematicsprofilGPA", "PhysicsGPA", "ChemistryGPA", "ComputerscienceGPA", "BiologyGPA", "HistoryGPA", "GeographyGPA", "EnglishGPA", "SocialStudiesGPA", "LiteratureGPA"];
        schoolSubjectTrendsText = ["Русский язык", "Математика", "Физика", "Химия", "Информатика", "Биология", "История", "География", "Английский язык", "Обществознание", "Литература"];
    }

    if (year == '2015-2016' && schoolSubjectTrends.length != 0) {
        create_trends_markers(myMap, schoolSubjectTrends, schoolSubjectTrendsText);
    }
    if ((year == '2015' || year == '2016') && schoolSubjectTrends.length != 0) {
        create_years_clasterer(myMap, year, schoolSubjectTrends, schoolSubjectTrendsText);
    }
};

function getCoordinates(ege) {
    var point = [];
    for(var index = 0; index < ege.length; index++) {
        	point.push([ege[index].Lat, ege[index].Long]);
    }
    return point;
};

function setMarkerColor_for_year(index, ege_data_current_year, schoolSubjectTrends) {
    var trend = $("input:radio[name='group2']:checked").val(),
        countTrends = 0,
        sumTrends = 0;
    for (var i = 0; i < schoolSubjectTrends.length; i++) {
        if (ege_data_current_year[index][schoolSubjectTrends[i]] != '-') {
            sumTrends += ege_data_current_year[index][schoolSubjectTrends[i]];
            countTrends++;
        }
    }

    if (trend == 'amount') {
        var cluster_one = 20,
            cluster_two = 15,
            cluster_three = 10;
    } else if (trend == 'GPA') {
        var cluster_one = 65,
            cluster_two = 55,
            cluster_three = 45;
    } else {
        var cluster_one = 100,
            cluster_two = 85,
            cluster_three = 70;
    }

    var score = sumTrends / countTrends;

    if (isNaN(score)){
        var claster = 'five';
    } else if (score >= cluster_one){
        var claster = 'one';
    } else if (score >= cluster_two) {
        var claster = 'two';
    } else if (score >= cluster_three) {
        var claster = 'three';
    } else {
        var claster = 'four';
    }

    if (claster == 'one') {
        return 'islands#darkGreenDotIcon';
    } else if (claster == 'two') {
        return 'islands#greenDotIcon';
    } else if (claster == 'three') {
        return 'islands#darkOrangeDotIcon';
    } else if (claster == 'four') {
        return 'islands#redDotIcon';
    } else {
        return "default#lightbluePoint"
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
        console.log(sumTrend, countTrends);
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

function getBalloonContentBody(indexSchool, schoolSubjectTrends, schoolSubjectTrendsText) {
    var trend = $("input:radio[name='group2']:checked").val() || 'GPA';
    var year = $("input:radio[name='group1']:checked").val() || "2015-2016";
    var countTrends = 0;
    var sumTrend = 0;

    if (year == "2015-2016") {
        if (trend == 'amount') {
            trend = 'количества учеников';
        } else if (trend == 'GPA') {
            trend = 'среднего балла';
        } else {
            trend = 'справляемости'
        }
        var BalloonContent = ege_trends[indexSchool]['Full name'] + '<br>' + '<strong>Изменение ' + trend + ' по предметам за ' + year + ' год:</strong>' + '<br>';
        for (var i = 0; i < schoolSubjectTrends.length; i++) {
            if (ege_trends[indexSchool][schoolSubjectTrends[i]] != '-') {
                BalloonContent +=  schoolSubjectTrendsText[i] + ': ' + '<strong> ';
                if (ege_trends[indexSchool][schoolSubjectTrends[i]] > 0 && year == "2015-2016") {
                    BalloonContent += '+';
                }
                BalloonContent += ege_trends[indexSchool][schoolSubjectTrends[i]] + '</strong><br>';
                countTrends++;
                sumTrend += ege_trends[indexSchool][schoolSubjectTrends[i]];
            }
        }
        var midTrend = (sumTrend / countTrends).toFixed(2);
        BalloonContent += '<strong> ' + 'Среднее изменение тренда: ';
        if (midTrend > 0 && year == "2015-2016"){
            BalloonContent += '+';
        }

    } else {
        trend = $("input:radio[name='group2']:checked").next('label').text();
        var BalloonContent = ege_data[year][indexSchool]['Full name'] + '<br>' + '<strong>' + trend + ' по предметам за ' + year + ' год:</strong>' + '<br>';
        for (var i = 0; i < schoolSubjectTrends.length; i++) {
            if (ege_data[year][indexSchool][schoolSubjectTrends[i]] != '-') {
                BalloonContent +=  schoolSubjectTrendsText[i] + ': ' + '<strong> ' + ege_data[year][indexSchool][schoolSubjectTrends[i]] + '</strong><br>';;
                countTrends++;
                sumTrend += ege_data[year][indexSchool][schoolSubjectTrends[i]];
            }
        }
        var midTrend = (sumTrend / countTrends).toFixed(2);
        BalloonContent += '<strong> ' + 'Среднее значение тренда: ';
    }

    BalloonContent += midTrend + '</strong><br>';
    return BalloonContent;
};