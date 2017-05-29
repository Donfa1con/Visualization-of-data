'use strict'
$(document).ready(function() {
    var checkedColor = 'green',
        uncheckedColor =  '#444',
        checkedGeneralCheckBoxColor = '#004c00',
        uncheckedGeneralCheckBoxColor = '#323232',
        hover = 'rgb(49, 163, 23)',
        checkbox_memory = {
            "year" : "",
            "trend" : "",
            "type_exams" : "",
            "exams" : ""
        },
        firstTextPeriodButton = 'Выбрать период',
        secondTextPeriodButton = 'Выбрать год';



    on_click_periodButton(uncheckedColor, firstTextPeriodButton, secondTextPeriodButton);
    on_click_boxButton(checkedColor, uncheckedColor, firstTextPeriodButton, secondTextPeriodButton, hover);
    on_click_general_button(uncheckedGeneralCheckBoxColor, checkedGeneralCheckBoxColor, checkedColor, uncheckedColor);
    on_click_exams_checkboxButton(uncheckedGeneralCheckBoxColor, checkedGeneralCheckBoxColor);
    on_click_nextButton(uncheckedColor, checkbox_memory, firstTextPeriodButton, secondTextPeriodButton);
});


function on_click_periodButton(uncheckedColor, firstTextPeriodButton, secondTextPeriodButton) {
    $(document).on('click','#periodButton', function() {
        $(".years").find('li').not('#periodButton').each(function() {
            $(this).find('input').prop('checked', false);
            $(this).css('background-color', uncheckedColor);
        });
        if ($(this).text() == firstTextPeriodButton) {
            $(this).text(secondTextPeriodButton);
            $(".menu>p").text("Период");
            $('#year').find('span').text('Период').append('<br><small>Не выбран</small>');
        } else {
            $(this).text(firstTextPeriodButton);
            $(".menu>p").text("Год");
            $('#year').find('span').text('Год').append('<br><small>Не выбран</small>');
        }
    });
}


function on_click_boxButton(checkedColor, uncheckedColor, firstTextPeriodButton, secondTextPeriodButton, hover) {
    $(document).on('click','.menu li', function() {
        if ($(this).find("input").hasClass("radiobox")) {
            $(this).find("input").prop("checked", true);
            $(this).closest("ul").find("li").each(function() {
                $(this).css('background-color', uncheckedColor);                
            });
            $(this).css('background-color', checkedColor);
        } else if ($(this).find("input").attr('name') != 'group1') {
            var check = $(this).find("input").is(":checked");
            $(this).find("input").prop("checked", !check);
            if (!check) {
                $(this).css('background-color', checkedColor);
            } else {
                $(this).css('background-color', uncheckedColor);
            }
        } else {
            play_year_or_perid_logic($(this), firstTextPeriodButton, uncheckedColor, checkedColor, hover);
        }
    });
}


function play_year_or_perid_logic(menu_li, firstTextPeriodButton, uncheckedColor, checkedColor, hover) {
    if ($("#periodButton").text() == firstTextPeriodButton) {
        menu_li.closest("ul").find("li").each(function() {
            $(this).css('background-color', uncheckedColor);
            $(this).find("input").prop("checked", false);
        });
        menu_li.css('background-color', checkedColor);
        menu_li.find("input").prop("checked", true);
    } else {
        if (menu_li.closest("ul").find("input:checked").length < 2) {
            var check = menu_li.find("input").is(":checked");
            if (!check) {
                menu_li.find("input").prop("checked", true);
                menu_li.css('background-color', checkedColor);
            } 
        } else {
            menu_li.find("input").prop("checked", false);
            menu_li.css('background-color', uncheckedColor);
        }

        if (menu_li.closest("ul").find("input:checked").length == 2) {
            var firstBox = menu_li.closest("ul").find("input:checked").first().closest('li'),
                lastBox = menu_li.closest("ul").find("input:checked").last().closest('li');
            firstBox.nextUntil(lastBox).each(function() {
                $(this).css('background-color', hover);
                $(this).addClass("betweenPeriod");
            });
        } else if (menu_li.closest("ul").find("input:checked").length == 1) {
            menu_li.closest("ul").find("li").each(function() {
                if ($(this).hasClass("betweenPeriod")) {
                    $(this).removeClass("betweenPeriod");
                    $(this).css('background-color', uncheckedColor);
                }
            });
        }
    }
}


function on_click_general_button(uncheckedGeneralCheckBoxColor, checkedGeneralCheckBoxColor, checkedColor, uncheckedColor) {
     $(document).on("click",".generalCheckBox", function(){
        if ($(this).find("input").is(":checked")){                
            $(this).css('background-color', checkedGeneralCheckBoxColor);
            $(this).next("ul").find("input:visible").each( function() {
                $(this).prop("checked", true);
                $(this).closest("li").css('background-color', checkedColor);
            });
        } else {
            $(this).css('background-color', uncheckedGeneralCheckBoxColor);
            $(this).next("ul").find("input:visible").each( function() {
                $(this).prop("checked", false);
                $(this).closest("li").css('background-color', uncheckedColor);
            });
        }
    });
}


function on_click_exams_checkboxButton(uncheckedGeneralCheckBoxColor, checkedGeneralCheckBoxColor) {
    $(document).on("click",".menu ul>ul li", function(){
        if ($(this).closest("ul").find("input:checked:visible").length == $(this).closest("ul").find("input:visible").length) {
            $(this).closest("ul").prev("li").find("input").prop("checked", true);
            $(this).closest("ul").prev("li").css('background-color', checkedGeneralCheckBoxColor);
        } else {
            $(this).closest("ul").prev("li").find("input").prop("checked", false);
            $(this).closest("ul").prev("li").css('background-color', uncheckedGeneralCheckBoxColor);
        }
    });
}


function on_click_nextButton(uncheckedColor, checkbox_memory, firstTextPeriodButton, secondTextPeriodButton) {
    $(document).on("click","#nextButton", function(){
        var title = $(".menu>p").text().replace(" ", "_").replace("Период","Год");        
        console.log(title);
        if ($(".NavBar li[value=" + title + "]").next("li").hasClass("active") && is_parameters_changed(checkbox_memory)) {
            reset_button_parameters(title, uncheckedColor);
        }

        checkbox_memory = {
            "year" : $("input[name='group1']:checked").next("label").text(),
            "trend" : $("input[name='group2']:checked").next("label").text(),
            "type_exams" : $("input[name='group3']:checked").next("label").text(),
            "exams" : $("input[name^='group3_']:checked").next("label").text()
        }
        console.log(is_valid_count_of_value(firstTextPeriodButton, secondTextPeriodButton));
        if (is_valid_count_of_value(firstTextPeriodButton, secondTextPeriodButton)) {
            var text = [];
            $(".menu .active input:checked").next("label").each(function() {
                text.push($(this).text());
            }); 
            $(".NavBar li[value=" + title + "]").not("#exams").not("#filters").find("small").text(text.join('-'));

            if (title == "Фильтры") {
                $(".menu").hide(0);
            } else {
                if (title == "Год") {
                    get_trends();
                } else if (title == "Тренд") {
                    get_exam_types();
                } else if (title == "Тип_экзамена") {
                    get_subjects();
                } else if (title == "Экзамены") {
                    var count_of_subjects = $(".menu input[name^='group3_']:checked").length;
                    $("#exams").find("small").text("Выбранно (" + count_of_subjects + ")");
                    $(".menu").hide(0);
                }

                $(".NavBar .active[value=" + title + "]").next("li").addClass("active").click();
                $(".menu .active").find("li").each(function(){
                    $(this).hide(0);
                });
            }
        }
    });
}

function is_parameters_changed(checkbox_memory) {
    var new_year = $("input[name='group1']:checked").next("label").text(),
        new_trend = $("input[name='group2']:checked").next("label").text(),
        new_type_exams = $("input[name='group3']:checked").next("label").text(),
        new_exams = $("input[name^='group3_']:checked").next("label").text();

    if (checkbox_memory["year"] != new_year && new_year != ''){
        return true;
    } else if (checkbox_memory["trend"] != new_trend && new_trend != '') {
        return true;
    } else if (checkbox_memory["type_exams"] != new_type_exams && new_type_exams != '') {
        return true;
    } else if (checkbox_memory["exams"] != new_exams && new_exams != '') {
        return true;
    }
    return false;
}


function reset_button_parameters(title, uncheckedColor) {
    $(".NavBar li[value=" + title + "]").nextAll().each(function() {
        $(this).removeClass("active");
        if ($(this).attr('id') == "exams") {
            $(this).find("small").text("Не выбраны");
        } else {
            $(this).not("#filters").find("small").text("Не выбран");
        }
        $(this).find("span").css('background', uncheckedColor);
    });
    if (title != "Экзамены") {
        $(".menu ul[value=" + title + "]").nextAll().find("input:checked").each(function() {
            $(this).closest("ul").prev("li").css('background-color', uncheckedColor);
            $(this).prop("checked", false);
            $(this).closest("ul").find("li").css('background-color', uncheckedColor);
            $(this).closest("ul").prop("checked", false);
        });
    }
}


function is_valid_count_of_value(firstTextPeriodButton, secondTextPeriodButton) {
    console.log($(".menu").find(".active").find("input:checked").length, firstTextPeriodButton, secondTextPeriodButton)
    if ($(".menu").find(".active").find("input:checked").length > 2) {
        return true;
    }
    if ($(".menu").find(".active").find("input[type='radio']:checked").length == 1) {
        return true;
    }
    if ($(".menu").find(".active").find("input:checked").length == 1 && $('#periodButton').text() == firstTextPeriodButton) {
        return true;
    }
    if ($(".menu").find(".active").find("input:checked").length == 2 && $('#periodButton').text() == secondTextPeriodButton) {
        return true;
    }
    return false;
}