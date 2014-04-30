

var ST = new Backbone.Marionette.Application();
var DEFAULT_PAGE_SIZE = 150;

ST.addRegions({
	controlBarRegion: '#control-bar-region',
	activitiesRegion: '#activities-region'
});

ST.addInitializer(function(options) {
	var imgList;
	ST.data = {};
	ST.data.allImages = options.imgs;
	ST.data.currentImages = options.imgs.slice(-DEFAULT_PAGE_SIZE);
	var imgs = _(ST.data.currentImages).map(function(item, i) { return { src: item, globalIndex: i }; });
	ST.data.currentColl = new ST.Models.ScreenshotCollection(imgs);
	var activities = ST.data.currentColl.groupBy(function(item) {
		// TODO: be smarter about grouping?
		return item.get('moment').format('YYYY-MM-DD HH');
	});
	activities = _(activities).map(function(item) { return { screenshots: item }; });
	ST.data.activities = new ST.Models.ActivityCollection(activities);

	ST.activitiesRegion.show(new ST.Views.ActivityGroup({
		collection: ST.data.activities
	}));

	// setup prev/next buttons on modal.
	// TODO: this should be a view
	$('#image-zoom').find('.modal-header .prev').click(function(evt) { switchImg(this, 'prev'); });
	$('#image-zoom').find('.modal-header .next').click(function(evt) { switchImg(this, 'next'); });
	var switchImg = function(btn, direction) {
		var currentIdx = +$(btn).attr('data-current-idx'),
			idxToOpen = (direction === 'prev') ? currentIdx - 1 : currentIdx + 1;

		$($('.shot')[idxToOpen]).click(); // TODO: this is kind of a hack
	};
});


