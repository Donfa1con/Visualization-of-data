'use strict'
function create_years_clasterer(myMap) {
    var year = $("input:radio[name='group1']:checked").val();
    var trend = $("input:radio[name='group2']:checked").val();
    var exam_type = $("input:radio[name='group3']:checked").val();
    var schoolSubject = [];

    $("input:checkbox:checked").not('#сompulsion').not('#choosingly').not('.checkbox').each(function() {
        schoolSubject.push($(this).val());
    });
    schoolSubject = schoolSubject.join(',');

   var objectManager = new ymaps.ObjectManager({
            gridSize: 150,
            clusterDisableClickZoom: true,
            minClusterSize : 27,
            clusterize: true,
            clusterIconLayout: 'default#pieChart',
            clusterIconPieChartRadius: 28,
            clusterIconPieChartCoreRadius: 19,
            clusterIconPieChartStrokeWidth: 2
        });
    myMap.geoObjects.add(objectManager);


    $.post("/api/get_year_info",
        {
            year: year,
            trend: trend,
            exam_type: exam_type,
            subjects: schoolSubject
        }
    ).done(function(data) {
        objectManager.add(data);
    });
}