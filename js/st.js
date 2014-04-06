var ST = (function($, _) {
	"use strict";

	var shots = [],
		DEFAULT_PAGE_SIZE = 24;

	var init = function(shotUrls) {
		createShots(shotUrls);
		latest(DEFAULT_PAGE_SIZE); // last two hours @ 5 min frequency
		console.log(shotUrls.length, 'images in ', Math.round(shotUrls.length/DEFAULT_PAGE_SIZE), 'pages');
	};

	var createShots = function(shotUrls) {
		_(shotUrls).each(function(shotUrl, i) {
			var date = moment(shotUrl, 'YYYY-MM-DD HH-mm-ss'),
				$div = $('<div />').addClass('shot'),
				$img = $('<img src=' + shotUrl + ' alt="" />');

			$img.attr('title', '#' + (i+1) + ' ' + date.calendar()).click(function(){
				$(this).toggleClass('zoomed'); // TODO: proper lightbox
			});
			$div.append($img);
			shots.push($div);
		});
	};

	var showRange = function(start, end) {
		var i, 
			$shots = $('.shots');
		
		$shots.html('');
		for (i=start; i<end; i++) {
			if (shots[i]) {
				$shots.append(shots[i]);
			}
		}
	};

	var latest = function(n) {
		showRange(shots.length - n, shots.length);
	};

	var showPage = function(n) {
		showRange(n * DEFAULT_PAGE_SIZE, n * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE);
	};

	return {
		init: init,
		showRange: showRange,
		showPage: showPage,
		latest: latest
	};

})(jQuery, _);

