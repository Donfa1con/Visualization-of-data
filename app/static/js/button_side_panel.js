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
					'<li><input type="radio" class="radio" id="trend2" name="group2" value="GPA" checked><label for="trend2">Средний балл</label></li>',
					'<li><input type="radio" class="radio" id="trend3" name="group2" value="spravlyaemost"><label for="trend3">Справляемость</label></li>',
				'</ul>',
				'<hr>',
				'<p class="upperP">Экзамены</p>',
				'<ul class="li-radio">',
					'<div class="checkUp">',
						'<input type="checkbox" class="radio" id="сompulsion" checked>',
						'<label for="сompulsion"></label>',
					'</div>',

						'<p class="lowerP">Обязательные:</p>',
					'<ul>',
						'<li><input type="checkbox" class="radio" id="Russian" name="group3_1" value="Russianlanguage" checked><label for="Russian">Русский язык</label></li>',
						'<li><input type="checkbox" class="radio" id="Mathematics" name="group3_1" value="Mathematicsprofil" checked><label for="Mathematics">Математика</label></li>',
					'</ul>',
					'<hr>',
					'<div class="checkUp">',
						'<input type="checkbox" class="radio" id="choosingly" checked>',
						'<label for="choosingly"></label>',
					'</div>',

						'<p class="lowerP">По выбору:</p>',
					'<ul>',
						'<li><input type="checkbox" class="radio" id="Physics" name="group3_2" value="Physics" checked><label for="Physics">Физика</label></li>',
						'<li><input type="checkbox" class="radio" id="Chemistry" name="group3_2" value="Chemistry" checked><label for="Chemistry">Химия</label></li>',
						'<li><input type="checkbox" class="radio" id="Computer" name="group3_2" value="Computerscience" checked><label for="Computer">Информатика</label></li>',
						'<li><input type="checkbox" class="radio" id="Biology" name="group3_2" value="Biology" checked><label for="Biology">Биология</label></li>',
						'<li><input type="checkbox" class="radio" id="History" name="group3_2" value="History" checked><label for="History">История</label></li>',
						'<li><input type="checkbox" class="radio" id="Geography" name="group3_2" value="Geography" checked><label for="Geography">География</label></li>',
						'<li><input type="checkbox" class="radio" id="English" name="group3_2" value="English" checked><label for="English">Английский язык</label></li>',
						'<li><input type="checkbox" class="radio" id="Social" name="group3_2" value="SocialStudies" checked><label for="Social">Обществознание</label></li>',
						'<li><input type="checkbox" class="radio" id="Literature" name="group3_2" value="Literature" checked><label for="Literature">Литература</label></li>',
					'</ul>',
				'</ul>',
				'<hr>',
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
			$('.menu').animate({ 
				right: '-1px'
			}, 200); 
			$("#icon-menu").hide(0)
		});

		$(document).on('click','#icon-close', function() {
			$('.menu').animate({
				right: '-205px'
			}, 200);
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

  		$(document).on("click","p.lowerP",function(){
  			var findUL = $(this).next("ul");

    		if (findUL.is(":visible")) {
    		    findUL.slideUp(200);
    		} else {
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

 		$(document).on("click","input[name='group3_1']", function(){
  			if (! $(this).is(":checked")){
          		$("#сompulsion").prop("checked", false);
        	} else if ($("input[name='group3_1']:checked").length == 2) {
           		$("#сompulsion").prop("checked", true);       		
        	}
 		});

		$(document).on("click","input[name='group3_2']", function(){
  			if (! $(this).is(":checked")){
          		$("#choosingly").prop("checked", false);
        	} else if ($("input[name='group3_2']:checked").length == 9) {
           		$("#choosingly").prop("checked", true);       		
        	}
 		});

 		$(document).on("click",".radio", function(){
 			$(document).delay(2000);
 			myMap.geoObjects.removeAll();
  			createMarker(myMap);
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