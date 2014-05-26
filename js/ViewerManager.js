ST.module("ViewerManager", function(Mod, App, Backbone, Marionette, $, _){
	"use strict";

	var TIME_INTERVAL = 1000 * 30, // check for a change every 30 seconds
		DEFAULT_PAGE_SIZE = 100, // number of screenshots to show
		shotCount = 0; 


	var loadShots = function() {
		App.Models.getScreenShotsPromise().done(function(data) { 
			if (data.length !== shotCount) { // use an event or backbone's smart add to trigger this instead?
				App.data.allShotsColl.reset(data);
				App.data.currentShotsColl = new App.Models.ScreenshotCollection(App.data.allShotsColl.last(DEFAULT_PAGE_SIZE));

				var activities = App.data.currentShotsColl.groupBy(function(item) {
					// TODO: be smarter about grouping?
					return item.get('moment').format('YYYY-MM-DD HH');
				});
				activities = _(activities).map(function(item) { return { screenshots: item }; });
				// Put most recent hour on top. (Move sorting into the view?)
				activities = activities.reverse();
				App.data.activities = new App.Models.ActivityCollection(activities);

				App.activitiesRegion.show(new App.Views.ActivityGroup({
					collection: App.data.activities
				}));
				shotCount = data.length;
			}
		});
	};

	// setup prev/next buttons on modal.
	var setupModal = function() {
		// TODO: this should be in a view
		$('#image-zoom').find('.modal-header .prev').click(function(evt) { switchImg(this, 'prev'); });
		$('#image-zoom').find('.modal-header .next').click(function(evt) { switchImg(this, 'next'); });
		var switchImg = function(btn, direction) {
			var currentIdx = +$(btn).attr('data-current-idx'),
				idxToOpen = (direction === 'prev') ? currentIdx - 1 : currentIdx + 1;

			if (idxToOpen) {
				$('.shot[data-gid=' + idxToOpen + ']').click();
			}
		};
	};


	App.addInitializer(function(options) {
		App.data = {};
		App.data.allShotsColl = new App.Models.ScreenshotCollection();
		setupModal();
		loadShots();
		setInterval(loadShots, TIME_INTERVAL);
	});

});


