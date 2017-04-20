'use strict'
function create_button_help_tips (myMap) {
	var tipsLayout = ymaps.templateLayoutFactory.createClass([
		'<div class="info">',
			'<div class="info_text">',
				'<span><strong>Год: </strong>{{ data.year }}</span><br>',
				'<span><strong>Тренд: </strong>{{ data.trend }}</span><br>',
				'<span><strong>Тип: </strong>{{ data.typeExam }}</span><br>',
				'<span><strong>Экзамены: </strong></span>',
					'{% if data.exams != "Не выбраны" %}',
						'{% for exam in data.exams %}',
							'<br><span class="info_text_exams">{{ exam }}</span>',
						'{% endfor %}',
					'{% else %}',
						'<span>{{ data.exams }}</span>',
					'{% endif %}',
			'</div>',
		'</div>',
		'<div>',
			'<label class="label_info">',
				'<p class="background-icon-menu">',
				'<img src="static/images/menu-ham-icon.png" class="img_info"></p>',
			'</label>',
		'</div>'
		].join('')
	);

	$(document).ready(function() { 
    	$(document).on("click","#showButton", function(){
    		var schoolSubjectTrendsText = [];
 			tips.data.set('year', $("input:radio[name='group1']:checked").next("label").text());
			tips.data.set('trend', $("input:radio[name='group2']:checked").next("label").text());
			tips.data.set('typeExam', $("input:radio[name='group3']:checked").next("label").text());
			$("input:checkbox:checked").not('#сompulsion').not('#choosingly').not('.checkbox').each(function() {
        		schoolSubjectTrendsText.push($(this).next("label").text());
    		});
    		if (schoolSubjectTrendsText.length == 0){
    			tips.data.set('exams', 'Не выбраны');
    		} else {
    			tips.data.set('exams', schoolSubjectTrendsText);
    		}
    		console.log(schoolSubjectTrendsText)
    		$(".info").show(0);
 		});

    	$(document).on("click",".label_info", function(){
    		if ($(".info").is(":visible")) {
    			$(".info").hide(0);
    		} else {
    			$(".info").show(0);
    		}
 		});

	});


	var tips  = new ymaps.control.Button({
			options: {
				layout: tipsLayout,
				float: "none",
    			position: {
        			bottom: 10,
        			left: 10
    			}
			},
			data: {
					year: 'Не выбран',
					trend: 'Не выбран',
					typeExam: 'Не выбран',
					exams: 'Не выбраны'
				}
		});
	
	myMap.controls.add(tips);
}