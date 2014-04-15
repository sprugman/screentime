

var ST = new Backbone.Marionette.Application();
var DEFAULT_PAGE_SIZE = 100;

ST.addRegions({
	controlBarRegion: '#control-bar-region',
	activitiesRegion: '#activities-region'
});

ST.addInitializer(function(options) {
	ST.data = {};
	ST.data.allImages = options.imgs;
	ST.data.currentImages = options.imgs.slice(-DEFAULT_PAGE_SIZE);
	var imgs = _(ST.data.currentImages).map(function(item) { return { src: item }; });
	ST.data.currentColl = new ST.Models.ScreenshotCollection(imgs);
	var activities = ST.data.currentColl.groupBy(function(item) {
		// TODO: be smarter about grouping
		return item.get('moment').format('YYYY-MM-DD HH');
	});
	activities = _(activities).map(function(item) { return { screenshots: item }; });
	ST.data.activities = new ST.Models.ActivityCollection(activities);

	ST.activitiesRegion.show(new ST.Views.ActivityGroup({
		collection: ST.data.activities
	}));
});


