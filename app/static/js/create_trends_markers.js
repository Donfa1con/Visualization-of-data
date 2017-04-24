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
        for (var index = 0; index < data.features.length; index++) {
            if (data.features[index].options.preset == "islands#grayCircleDotIcon") {
                console.log(data.features[index].options.preset)
                $('#bigCheckBox').show(0);
                break;
            }
            else {
                $('#bigCheckBox').hide(0);
            }
        }

        if (!$('#CheckBox').is(':checked')){
            objectManager.setFilter('options.preset != "islands#grayCircleDotIcon"');
        }
        objectManager.add(data);
    });
}