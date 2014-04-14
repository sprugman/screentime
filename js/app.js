var ST = new Backbone.Marionette.Application();
(function($, _) {
	"use strict";

	var shots = [],
		DEFAULT_PAGE_SIZE = 20;

	ST.addRegions({
		controlBarRegion: '#control-bar-region',
		screenshotsRegion: '#screenshots-region'
	});

	ST.addInitializer(function(options) {
		ST.data = {};
		ST.data.allImages = options.imgs;
		ST.data.currentImages = options.imgs.slice(-DEFAULT_PAGE_SIZE);
		var imgs = _(ST.data.currentImages).map(function(item) { return { src: item }; });
		ST.data.currentColl = new ST.Models.ScreenshotCollection(imgs);
		var activities = ST.data.currentColl.groupBy(function(item) {
			return item.get('moment').hour();
		});
		activities = _(activities).map(function(item) { return { screenshots: item }; });
		ST.data.activities = new ST.Models.ActivityCollection(activities);

		ST.controlBarRegion.show(new Backbone.View());
		ST.screenshotsRegion.show(new ST.Views.Activity({
			collection: ST.data.currentColl,
			model: new ST.Models.Activity({ screenshots: ST.data.currentColl.models })
		}));
	});





	var init = function(shotUrls) {
		createShots(shotUrls);
		latest(DEFAULT_PAGE_SIZE); // last two hours @ 5 min frequency
		console.log(shotUrls.length + 'images in ' + Math.ceil(shotUrls.length/DEFAULT_PAGE_SIZE) + ' pages');
	};

	var createShots = function(shotUrls) {
		var prevDate;
		
		// shotUrls.reverse();
		_(shotUrls).each(function(shotUrl, i) {
			var dateTime = moment(shotUrl, 'YYYY-MM-DD HH-mm-ss'),
				dateStr = dateTime.clone().format('YYYYMMDD'),
				$div = $('<div />').addClass('shot'),
				$img = $('<img src=' + shotUrl + ' alt="" />');

			if (prevDate !== dateStr) {
				$div.addClass('new-day');
				prevDate = dateStr;
			}
			$img.attr('title', '#' + (i+1) + ' ' + dateTime.calendar()).click(function(){
				var $modal = $('#image-zoom'),
					$fullImg = $('<img />').attr('src', shotUrl.replace('thumbs', 'full')),
					$imgContainer = $('<div />').addClass('zoomed').html($fullImg);
				$modal.find('.modal-body').html($imgContainer);
				$modal.modal();
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

