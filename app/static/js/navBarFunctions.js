'use strict'
'use strict'
$(document).ready(function() {
    hide_or_show_sidePanel();
    on_click_yearButton();
    switch_sidePanels_and_navBar();
});


function on_click_yearButton() {
    $(document).on('click','#year', function() {
        get_years();
    });
}


function hide_or_show_sidePanel() {
    $(document).on('click','.NavBar li', function() {
        var title = $(this).find("span").clone().children().remove().end().text();
        if ($('.menu').is(":visible") && $(".menu>p").text() == title) {
            $('.menu').hide(0);
        } else if ($(this).hasClass("active")) {
                $('.menu').show(0);
                $(".menu>p").text(title);
        }
    });
}


function switch_sidePanels_and_navBar() {
    var hover_color = '#222';
    
    $(document).on('click','.NavBar .active', function() { 
        if ($(this).attr("id") != "exams" && $(this).attr("id") != "filters") {
            $("#nextButton").text("Далее");
        } else {
            $("#nextButton").text("Показать результат");
        }

        var title = $(this).find("span").clone().children().remove().end().text().replace(" ", "_").replace('Период','Год');
        $(this).find("span").css('background', hover_color);
        $(".menu ul").removeClass("active").hide(0);
        $(".menu ul[value=" + title + "]").addClass("active").show(0);
    });
}
