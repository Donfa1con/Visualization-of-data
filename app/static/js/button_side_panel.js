'use strict'
function create_button_side_panel (myMap) {

	var Panel = ymaps.templateLayoutFactory.createClass([
		'<div class="menu">',	  
				'<img id="icon-close" src="static/images/close-btn.png">',
			'<hr>',
		  	'<div class="accordion">',

				'<p class="upperP">Год</p>',
				'<ul class="li-radio" style="display:none">',
					'<li><input type="radio" class="radio" id="year2015" name="group1" value="2015"><label for="year2015">2015</label></li>',
					'<li><input type="radio" class="radio" id="year2016" name="group1" value="2016"><label for="year2016">2016</label></li>',
					'<li><input type="radio" class="radio" id="year2015-6" name="group1" value="2015-2016" checked><label for="year2015-6">2015-2016</label></li>',
				'</ul>',
				'<hr>',
				'<p class="upperP">Тренд</p>',
				'<ul class="li-radio" style="display:none">',
					'<li><input type="radio" class="radio" id="trend1" name="group2" value="amount"><label for="trend1">Количество учеников</label></li>',
					'<li><input type="radio" class="radio" id="trend2" name="group2" value="gpa" checked><label for="trend2">Средний балл</label></li>',
					'<li><input type="radio" class="radio" id="trend3" name="group2" value="success_percent"><label for="trend3">Справляемость</label></li>',
				'</ul>',
				'<hr>',
				'<hr>',
				'<p class="upperP">Тип экзамена</p>',
				'<ul class="li-radio" style="display:none">',
					'<li><input type="radio" class="radio" id="OGE" name="group3" value="OGE"><label for="OGE">ГИА</label></li>',
					'<li><input type="radio" class="radio" id="EGE" name="group3" value="EGE" checked><label for="EGE">ЕГЭ</label></li>',
				'</ul>',
				'<hr>',
				'<hr>',
				'<p class="upperP" id="exams">Экзамены</p>',

				'<ul class="li-radio">',

					'<div class="checkUp examsEGE">',
						'<input type="checkbox" class="radio" id="сompulsion" >',
						'<label for="сompulsion"></label>',
					'</div>',
					'<p class="lowerP examsEGE">Обязательные:</p>',
					'<ul class="examsEGE">',
						'<li><input type="checkbox" class="radio" id="Russian" name="group3_1" value="1" ><label for="Russian">Русский язык</label></li>',
						'<li><input type="checkbox" class="radio" id="Mathematicsprofil" name="group3_1" value="3" ><label for="Mathematicsprofil">Математика проф.</label></li>',
						'<li><input type="checkbox" class="radio" id="Mathematicsbase" name="group3_1" value="4" ><label for="Mathematicsbase">Математика базовая</label></li>',
					'</ul>',
					'<hr class="examsEGE">',

					'<div class="checkUp examsEGE">',
						'<input type="checkbox" class="radio" id="choosingly" >',
						'<label for="choosingly"></label>',
					'</div>',
					'<p class="lowerP examsEGE">По выбору:</p>',
					'<ul style="display:none" id="addEGE" class="examsEGE">',  
						'<li><input type="checkbox" class="radio" id="Physics" name="group3_2" value="5" ><label for="Physics">Физика</label></li>',
						'<li><input type="checkbox" class="radio" id="Chemistry" name="group3_2" value="6" ><label for="Chemistry">Химия</label></li>',
						'<li><input type="checkbox" class="radio" id="Computer" name="group3_2" value="7" ><label for="Computer">Информатика</label></li>',
						'<li><input type="checkbox" class="radio" id="Biology" name="group3_2" value="8" ><label for="Biology">Биология</label></li>',
						'<li><input type="checkbox" class="radio" id="History" name="group3_2" value="9" ><label for="History">История</label></li>',
						'<li><input type="checkbox" class="radio" id="Geography" name="group3_2" value="10" ><label for="Geography">География</label></li>',
						'<li><input type="checkbox" class="radio" id="Social" name="group3_2" value="12" ><label for="Social">Обществознание</label></li>',
						'<li><input type="checkbox" class="radio" id="Literature" name="group3_2" value="13" ><label for="Literature">Литература</label></li>',
						'<li><input type="checkbox" class="radio" id="English" name="group3_2" value="11" ><label for="English">Английский язык</label></li>',
						'<li><input type="checkbox" class="radio" id="German" name="group3_2" value="14" ><label for="German">Немецкий язык</label></li>',
						'<li><input type="checkbox" class="radio" id="French" name="group3_2" value="15" ><label for="French">Французский язык</label></li>',
					'</ul>',

					'<div style="display:none" class="checkUp examsOGE">',
						'<input type="checkbox" class="radio" id="examsOGE">',
						'<label for="examsOGE"></label>',
					'</div>',
					'<p style="display:none" class="lowerP examsOGE">Все:</p>',
					'<ul style="display:none"  class="examsOGE">', 
						'<li><input type="checkbox" class="radio" id="RussianOGE" name="group3_3" value="1"><label for="RussianOGE">Русский язык</label></li>',
						'<li><input type="checkbox" class="radio" id="MathematicsOGE" name="group3_3" value="2"><label for="MathematicsOGE">Математика</label></li>',
					'</ul>',
				'</ul>',
				'<hr>',
			'<button type="button" class="btn btn-success" id="showButton">Показать результат</button>',
		  	'</div>',

		'</div>',

		'<div class="position-icon-menu">',
			'<label id="icon-menu" class="mylabel">',
				'<p class="background-icon-menu">{{data.title}}   ',
				'<img class="img-menu" src="static/images/menu-ham-icon.png"></p>',
			'</label>',
		'</div>'].join('')
	);


	$(document).ready(function() { 
		$(document).on('click','#icon-menu', function() { 
			$('.menu').show(0);
			$('.menu').animate({ 
				right: '-1px'
			}, 200); 
			$("#icon-menu").hide(0)
		});

		$(document).on('click','#icon-close', function() {
			$('.menu').animate({
				right: '-205px'
			}, 200);
			$('.menu').hide(0);
			$("#icon-menu").delay(200).show(0);
		});

  		$(document).on("click",".accordion p.upperP",function(){
    		var findUL = $(this).next(".li-radio");
    		var findAcord = $(this).closest(".accordion");
    
    		if (findUL.is(":visible")) {
    		    findUL.slideUp(200);
    		} else {
    		    findAcord.find(".li-radio").slideUp(200);
    		    findUL.slideDown(200);
    		}
  		});

  		$(document).on("click",".lowerP",function(){
    		var findUL = $(this).next("ul");
    		var findAcord = $(this).closest(".li-radio");
    		if (findUL.is(":visible")) {
    		    findUL.slideUp(200);
    		} else {
    		    findAcord.find("ul").slideUp(200);
    		    findUL.slideDown(200);
    		}
  		});

  		$(document).on("click","#choosingly", function(){
  			if ( $("#choosingly").is(":checked") ){
   				$("input[name='group3_2']").each( function() {
      				$(this).prop("checked", true);});
   			} else {
        		$("input[name='group3_2']").each( function() {
      				$(this).prop("checked", false);  
          		});
   			}
 		});

 		$(document).on("click","#сompulsion", function(){
  			if ( $("#сompulsion").is(":checked") ){
   				$("input[name='group3_1']").each( function() {
      				$(this).prop("checked", true);});
   			} else {
        		$("input[name='group3_1']").each( function() {
      				$(this).prop("checked", false);
          		});
   			}
 		});

 		$(document).on("click","#examsOGE", function(){
  			if ( $("#examsOGE").is(":checked") ){
   				$("input[name='group3_3']").each( function() {
      				$(this).prop("checked", true);});
   			} else {
        		$("input[name='group3_3']").each( function() {
      				$(this).prop("checked", false);
          		});
   			}
 		});

 		$(document).on("click","input[name='group3_1']", function(){
  			if (! $(this).is(":checked")){
          		$("#сompulsion").prop("checked", false);
        	} else if ($("input[name='group3_1']:checked").length == 3) {
           		$("#сompulsion").prop("checked", true);       		
        	}
 		});

		$(document).on("click","input[name='group3_2']", function(){
  			if (! $(this).is(":checked")){
          		$("#choosingly").prop("checked", false);
        	} else if ($("input[name='group3_2']:checked").length == 11) {
           		$("#choosingly").prop("checked", true);
        	}
 		});

 		$(document).on("click","input[name='group3_3']", function(){
  			if (! $(this).is(":checked")){
          		$("#examsOGE").prop("checked", false);
        	} else if ($("input[name='group3_2']:checked").length == 2) {
           		$("#examsOGE").prop("checked", true);
        	}
 		});

 		$(document).on("click","input[name='group3']", function(){
 			$("input[type='checkbox']").prop("checked", false);
 			if($("input[name='group3']:checked").val() == "EGE") { 
 				$(".examsOGE").hide(0);
 				$(".examsEGE").not("#addEGE").show(0);
 			} else {
 				$(".examsOGE").show(0);
 				$(".examsEGE").hide(0);
 			}
 		});


 		$(document).on("click","#showButton", function(){
 			if ($("input:checkbox:checked").not('.checkbox').length != 0 &&
 				$("input:radio:checked").length == 3) {

 				createMarker(myMap);
 			}	
 		});
	});

	var sidePanel  = new ymaps.control.Button({
			options: {
				layout: Panel,
				position: {
					right: 20,
				}
			},
			data: {
					title: 'Параметры'
				}
		});

	myMap.controls.add(sidePanel, {float: 'right'});
}