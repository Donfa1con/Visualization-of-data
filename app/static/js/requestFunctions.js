'use strict'
function get_years() {
	$.post("/api/get_years").done(function(data) {
		for (var index = 0; index < data.length; ++index) {
			var id = 'year' + data[index],
				value = data[index],
				tag = '<li><input type="checkbox" class="radio" id=' + id + ' name="group1" value=' + value + '><label for=' + id + '>' + value + '</label></li>';
			if($(".menu input:checkbox").is('#' + id)){
    			$('#' + id).closest('ul').show(0);
			} else {
				$(tag).insertBefore("#periodButton");
			}
    	}
    });
}


function get_trends() {
    $.post("/api/get_trends").done(function(data) {
        $(".menu").find(".active").find("li").each(function(){
            for (var index = 0; index < data.length; ++index) {
                if ($(this).find("input").val() == data[index].name) {
                    $(this).show(0);
                }
            }
        })
    });
}


function get_exam_types() {
    $.post("/api/get_exam_types").done(function(data) {
        $(".menu").find(".active").find("li").each(function(){
            for (var index = 0; index < data.length; ++index) {
                if ($(this).find("input").val() == data[index]) {
                    $(this).show(0);
                }
            }
        })
    });
}


function get_subjects() {
    var year = $("input:checkbox[name='group1']:checked").val().split(',');
    console.log(year);
    $.post("/api/get_subjects",
        {
            years: year
        }
        ).done(function(data) {
        $(".menu").find(".active").find("li").each(function(){
            for (var index = 0; index < data.length; ++index) {
                if ($(this).find("input").val() == data[index].subject_id) {
                    $(this).show(0).closest("ul").prev("li").show(0);;
                }
            }
        })
    });
}