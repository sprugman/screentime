ST.module("Models", function(Mod, App, Backbone, Marionette, $, _){
	"use strict";

	var Screenshot = Backbone.Model.extend({
		defaults: {
			src: null,
			fullSrc: null,
			moment: null
		},
		initialize: function(attributes, options) {
			if (this.validate(attributes, options)) {
				this.set('moment', moment(attributes.src, 'YYYY-MM-DD HH-mm-ss'));
				this.set('fullSrc', attributes.src.replace('thumbs', 'full'));
			}
		},
		validate: function(attributes, options) {
			return !!attributes.src;
		}
	});

	var ScreenshotCollection = Backbone.Collection.extend({
		model: Screenshot
	});

	var Activity = Backbone.Model.extend({
		defaults: {
			screenshots: null,
			label: null
		},
		initialize: function(attributes, options) {
			var coll;
			if (attributes.screenshots && attributes.screenshots.length) { // TODO: check if it's already a collection
				coll = new ScreenshotCollection(attributes.screenshots);
				this.set('screenshots', coll);
				this.set('label', coll.at(0).get('moment').calendar());
			}
		}
	});

	var ActivityCollection = Backbone.Collection.extend({
		model: Activity
	});

	// TODO: make more like a namespace
	Mod.Screenshot = Screenshot;
	Mod.ScreenshotCollection = ScreenshotCollection;
	Mod.Activity = Activity;
	Mod.ActivityCollection = ActivityCollection;
});


