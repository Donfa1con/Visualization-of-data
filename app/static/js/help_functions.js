'use strict'
function createMarker(myMap) {
    var year = document.getElementById('button_to_change_years_header').innerHTML.split(" ")[0];
    var school_subject = document.getElementById('button_to_change_school_subject_header').innerHTML.split(" ")[0];
    var trend = document.getElementById('button_to_change_trend_header').innerHTML.split(" ")[0];
    var school_subject_trend = getSchoolSubjectTrend(school_subject, trend);

    if (year == '2015-2016' && school_subject != 'Выберите' && trend != 'Выберите') {
        create_trends_markers(myMap, school_subject_trend);
    }
    if ((year == '2015' || year == '2016') && school_subject != 'Выберите' && trend != 'Выберите') {
        create_years_clasterer(myMap, year, school_subject_trend);
    }
};

function getCoordinates(ege) {
    var point = [];
    for(var index = 0; index < ege.length; index++) {
        	point.push([ege[index].Lat, ege[index].Long]);
    }
    return point;
};

function setMarkerColor_for_year(index, ege_data_current_year, school_subject_trend) {
    school_subject_trend += 'cluster';
    if (ege_data_current_year[index][school_subject_trend] == 'one') {
        return 'islands#darkGreenDotIcon';
    } else if (ege_data_current_year[index][school_subject_trend] == 'two') {
        return 'islands#greenDotIcon';
    } else if (ege_data_current_year[index][school_subject_trend] == 'three') {
        return 'islands#darkOrangeDotIcon';
    } else if (ege_data_current_year[index][school_subject_trend] == 'four') {
        return 'islands#redDotIcon';
    } else if (ege_data_current_year[index][school_subject_trend] == 'five') {
        return 'islands#grayDotIcon';
    }
};

function setMarkerColor_for_trends(index, school_subject_trend) {
	var trend = ege_trends[index][school_subject_trend];
    if (trend > 0) {
        return 'islands#darkGreenCircleDotIcon';
    } else if (trend < 0) {
        return 'islands#redCircleDotIcon';
    } else {
        return 'islands#grayCircleDotIcon';
    }
};

function getSchoolSubjectTrend(school_subject, trend) {
    var school_subject_and_trands = ['Русский','Математика','Физика','Химия',
                                    'Биология','География','Информатика','Литература',
                                    'История','Обществознание','Английский','Обязательные',
                                    'Все','Количество','Средний', 'Справляемость'];
    var translator_school_subject_and_trands = ['Russianlanguage','Mathematicsprofil',
                                            'Physics','Chemistry','Biology','Geography',
                                            'Computerscience','Literature','History',
                                            'SocialStudies','English','Required','',
                                            'amount', 'GPA','spravlyaemost'];
    var similar_dict = {};

    for (var index = 0; index < school_subject_and_trands.length; ++index) {
        var subject_or_trands = school_subject_and_trands[index];
        var translator_subject_or_trands = translator_school_subject_and_trands[index];
        similar_dict[subject_or_trands] = translator_subject_or_trands
    }

    var school_subject_trend = similar_dict[school_subject] + similar_dict[trend];
    return school_subject_trend;
};