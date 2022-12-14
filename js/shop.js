'use strict';
$(document).ready(function() {
	const CASH = $('#cash');
	const DMG = $('#dmg');
	const DPS = $('#dps');
	
	let cash = 0;
	let dmg = 1;
	let dps = 0;
	
	if (localStorage.getItem('cash')) {
		cash = localStorage.getItem('cash');
		CASH.text(cash);
	};
	if (localStorage.getItem('dmg')) {
		dmg = localStorage.getItem('dmg');
		DMG.text(dmg);
	};
	if (localStorage.getItem('dps')) {
		dps = localStorage.getItem('dps');
		DPS.text(dps);
	};
	
	$('#dmginc').on('click', function() {
		if (cash < 1) {
			$(this).addClass('_anim');
			setTimeout(() => {
				$(this).removeClass('_anim');
			}, 550);
		} else {
			cash--;
			localStorage.setItem('cash', cash);
			dmg++;
			localStorage.setItem('dmg', dmg);
			CASH.text(cash);
			DMG.text(dmg);
			$(this).removeClass('_anim2');
			$(this).addClass('_anim2');
			setTimeout(() => {
				$(this).removeClass('_anim2');
			}, 550);
		}
	});
	
	$('#dpsinc').on('click', function() {
		if (cash < 3) {
			$(this).addClass('_anim');
			setTimeout(() => {
				$(this).removeClass('_anim');
			}, 550);
		} else {
			cash -= 3;
			localStorage.setItem('cash', cash);
			dps++;
			localStorage.setItem('dps', dps);
			CASH.text(cash);
			DPS.text(dps);
			$(this).removeClass('_anim2');
			$(this).addClass('_anim2');
			setTimeout(() => {
				$(this).removeClass('_anim2');
			}, 550);
		}
	});
});