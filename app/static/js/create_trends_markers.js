'use strict'
function create_trends_markers(myMap) {
    var trend = $("input:radio[name='group2']:checked").val();
    var schoolSubject = [];

    $("input:checkbox:checked").not('#сompulsion').not('#choosingly').not('.checkbox').each(function() {
        schoolSubject.push($(this).val());
    });
    schoolSubject = schoolSubject.join(',');
    var objectManager = new ymaps.ObjectManager();
    myMap.geoObjects.add(objectManager);
    
    $.post("/api/get_trends_info",
        {
            trend: trend,
            subjects: schoolSubject
        }
    ).done(function(data) {
        console.log(data);
        objectManager.add(data);
    });
}