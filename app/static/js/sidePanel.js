'use strict'
function createSidePanel (myMap) {

	/*<li><input type="radio" class="radio radiobox" id="year2015" name="group1" value="2015"><label for="year2015">2015</label></li>
	  <li><input type="radio" class="radio radiobox" id="year2016" name="group1" value="2016"><label for="year2016">2016</label></li>
	  <li><input type="radio" class="radio radiobox" id="year2015-6" name="group1" value="2015,2016"><label for="year2015-6">2015-2016</label></li>*/

	var sidePanelLayout = ymaps.templateLayoutFactory.createClass(
		'<div class="menu">\
				<p class="title"></p>\
			<div>\
				<ul value="Год" class="years">\
					<button type="button" class="btn btn-success" id="periodButton">Выбрать период</button>\
				</ul>\
				<ul value="Тренд">\
					<li><input type="radio" class="radio radiobox" id="trend1" name="group2" value="amount"><label for="trend1">Количество учеников</label></li>\
					<li><input type="radio" class="radio radiobox" id="trend2" name="group2" value="gpa"><label for="trend2">Средний балл</label></li>\
					<li><input type="radio" class="radio radiobox" id="trend3" name="group2" value="success_percent"><label for="trend3">Справляемость</label></li>\
				</ul>\
				<ul value="Тип_экзамена">\
					<li><input type="radio" class="radio radiobox" id="OGE" name="group3" value="OGE"><label for="OGE">ГИА</label></li>\
					<li><input type="radio" class="radio radiobox" id="EGE" name="group3" value="EGE"><label for="EGE">ЕГЭ</label></li>\
				</ul>\
				<ul value="Экзамены">\
					<li class="generalCheckBox">\
						<div class="checkUp examsEGE">\
							<input type="checkbox" class="radio" id="сompulsion" >\
							<label for="сompulsion"></label>\
						</div>\
						<p class="lowerP examsEGE">Обязательные:</p>\
					</li>\
					\
						<ul class="examsEGE" value="Экзамены">\
							<li><input type="checkbox" class="radio" id="Russian" name="group3_1" value="1" ><label for="Russian">Русский язык</label></li>\
							<li><input type="checkbox" class="radio" id="Mathematicsprofil" name="group3_1" value="3" ><label for="Mathematicsprofil">Математика проф.</label></li>\
							<li><input type="checkbox" class="radio" id="Mathematicsbase" name="group3_1" value="4" ><label for="Mathematicsbase">Математика базовая</label></li>\
							<li><input type="checkbox" class="radio" id="MathematicsOGE" name="group3_3" value="2"><label for="MathematicsOGE">Математика</label></li>\
						</ul>\
					\
					<li class="generalCheckBox">\
						<div class="checkUp examsEGE">\
							<input type="checkbox" class="radio" id="choosingly" >\
							<label for="choosingly"></label>\
						</div>\
					<p class="lowerP examsEGE">По выбору:</p>\
					</li>\
					\
						<ul id="addEGE" class="examsEGE" value="Экзамены">\
							<li><input type="checkbox" class="radio" id="Physics" name="group3_2" value="5" ><label for="Physics">Физика</label></li>\
							<li><input type="checkbox" class="radio" id="Chemistry" name="group3_2" value="6" ><label for="Chemistry">Химия</label></li>\
							<li><input type="checkbox" class="radio" id="Computer" name="group3_2" value="7" ><label for="Computer">Информатика</label></li>\
							<li><input type="checkbox" class="radio" id="Biology" name="group3_2" value="8" ><label for="Biology">Биология</label></li>\
							<li><input type="checkbox" class="radio" id="History" name="group3_2" value="9" ><label for="History">История</label></li>\
							<li><input type="checkbox" class="radio" id="Geography" name="group3_2" value="10" ><label for="Geography">География</label></li>\
							<li><input type="checkbox" class="radio" id="Social" name="group3_2" value="12" ><label for="Social">Обществознание</label></li>\
							<li><input type="checkbox" class="radio" id="Literature" name="group3_2" value="13" ><label for="Literature">Литература</label></li>\
							<li><input type="checkbox" class="radio" id="English" name="group3_2" value="11" ><label for="English">Английский язык</label></li>\
							<li><input type="checkbox" class="radio" id="German" name="group3_2" value="14" ><label for="German">Немецкий язык</label></li>\
							<li><input type="checkbox" class="radio" id="French" name="group3_2" value="15" ><label for="French">Французский язык</label></li>\
						</ul>\
					\
				</ul>\
			<button type="button" class="btn btn-success" id="nextButton">Далее</button>\
			</div>\
		</div>'	
	);

	var sidePanel  = new ymaps.control.Button({
			options: {
				layout: sidePanelLayout,
				position:{
					top: -10,
				}
			}
		});

	myMap.controls.add(sidePanel, {float: 'right'});
}