'use strict'
function createNavBar (myMap) {

	var Bar = ymaps.templateLayoutFactory.createClass(
	'<div class="NavBar">\
		<nav>\
			<ul>\
				<li id="year" class="active" value="Год"><span style="background: #222">Год<br><small>Не выбран</small></span></li>\
				<li id="trend" value="Тренд"><span>Тренд<br><small>Не выбран</small></span></li>\
				<li id="typeExam" value="Тип_экзамена"><span>Тип экзамена<br><small>Не выбран</small></span></li>\
				<li id="exams" value="Экзамены"><span>Экзамены<br><small>Не выбраны</small></li>\
				<li id="filters" value="Фильтры"><span>Фильтры<br><small></small></span></li>\
			</ul>\
		</nav>\
	</div>'
	);

	var navBar  = new ymaps.control.Button({
			options: {
				layout: Bar,
			},
			data: {
					title: 'Параметры'
				}
		});

	myMap.controls.add(navBar, {float: 'top'});
}