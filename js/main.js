'use strict';
$(window).on('beforeunload', function() {
	localStorage.setItem('last_session', new Date().getTime());
});
$(document).ready(function() {
	const BUTTON = $('button');
	const MAX = $('#max');
	const CURRENT = $('#current');
	const LINE = $('.health__bar span');
	const CASH = $('#cash');
	const DMG = $('#dmg');
	const DPS = $('#dps');
	
	let stat = {
		'max': 10,
		'current': 10,
		'dmg': 1,
		'line': 100,
		'cash': 0,
		'dps': 0,
	};

	if (localStorage.getItem('current')) stat.current = localStorage.getItem('current');
	if (localStorage.getItem('max')) stat.max = localStorage.getItem('max');
	if (localStorage.getItem('dmg')) stat.dmg = localStorage.getItem('dmg');
	if (localStorage.getItem('dps')) stat.dps = localStorage.getItem('dps');
	if (localStorage.getItem('line')) stat.line = localStorage.getItem('line');
	if (localStorage.getItem('cash')) stat.cash = localStorage.getItem('cash');

	offline();
	
	init();
	
	BUTTON.on('click', function(e) {
		attack(stat.dmg);
		over($(this), e);
	});
	
	if (stat.dps > 0) {
		setInterval(() => {
			attack(stat.dps);
		}, 1000);
	};

	let click_num = 1;

	function offline() {
		let last_session = localStorage.getItem('last_session');
		let this_session = new Date().getTime();
		let different = Math.floor((this_session - last_session) / 1000);
		if (different > 0) {
			let seconds = different;
			let minutes = Math.floor(seconds/60);
			let hours = Math.floor(minutes/60);
			seconds -= minutes * 60;
			minutes -= hours * 60;
			$('#hours').text(hours);
			$('#minutes').text(minutes);
			$('#seconds').text(seconds);
			let inactive_dmg = seconds * stat.dps;
			$('#inactive_dmg').text(inactive_dmg);
			attack(inactive_dmg);
			setTimeout(() => {
				$('.offline-alert').addClass('_active');
			}, 1000);
			$('.offline-alert__close').on('click', function() {
				$('.offline-alert').removeClass('_active');
			});
			$('.offline-alert__detail').on('click', function() {
				$('.offline-alert__info').toggleClass('_active');
				$(this).toggleClass('_active');
			});
		}
	};

	function over(block, e) {
		let X = block.offset().left;
		let Y = block.offset().top;
		let x = e.clientX;
		let y = e.clientY;
		x = x - X;
		y = y - Y;
		$('button').append(`<span class="over" data-click-num="${click_num}" style="left: ${x}px;top: ${y}px;">-${stat.dmg}</span>`);
		setTimeout(() => {
			$(`.over[data-click-num=${click_num}]`).remove();
		}, 750);
		click_num++;
	};
	
	function eq(max, dmg) {
		return 100 / max * dmg;
	};
	
	function attack(dmg) {
		if (stat.current != 0) {
			stat.current -= dmg;
			stat.line -= eq(stat.max, dmg);
			CURRENT.text(stat.current);
			LINE.css('width', `${stat.line}%`);
		};
		if (stat.current <= 0) {
			defeat();
		};
		save();
	};
	
	function defeat() {
		stat.max *= 1.2;
		stat.max = parseInt(stat.max);
		stat.current = stat.max;
		stat.line = 100;
		stat.cash++;
		LINE.css('width', '100%');
		CASH.text(stat.cash);
		MAX.text(stat.max);
		CURRENT.text(stat.current);
	};
	
	function init() {
		MAX.text(stat.max);
		CURRENT.text(stat.current);
		if (stat.cash > 0) {
			CASH.text(stat.cash);
		};
		if (stat.line != 100) {
			LINE.css('width', `${stat.line}%`);
		};
		if (stat.dmg > 1) {
			DMG.text(stat.dmg);
		};
		if (stat.dps > 0) {
			DPS.text(stat.dps);
		};
	};
	
	function save() {
		localStorage.setItem('current', stat.current);
		localStorage.setItem('max', stat.max);
		localStorage.setItem('cash', stat.cash);
		localStorage.setItem('line', stat.line);
	};
	
	$('.clear').on('click', function() {
		localStorage.clear();
		location.reload();
	});
});