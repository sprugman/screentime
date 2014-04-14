ST.module("Views", function(Mod, App, Backbone, Marionette, $, _){
	"use strict";

	Mod.Screenshot = Backbone.Marionette.ItemView.extend({
		template: '#screenshot-view',
		className: 'shot',
		events: {
			'click': function(evt) { 
				// TODO: turn this into a view
				var $modal = $('#image-zoom'),
					$fullImg = $('<img />').attr('src', this.model.get('fullSrc')),
					$imgContainer = $('<div />').addClass('zoomed').html($fullImg);
				$modal.find('.modal-body').html($imgContainer);
				$modal.modal();
			}
		}
	});

	Mod.Activity = Backbone.Marionette.CompositeView.extend({
		itemView: Mod.Screenshot,
		template: '#screenshot-group-view',
		itemViewContainer: '.shots',
		className: 'shot-group'
	});

	Mod.ScreenshotGroups = Backbone.Marionette.CompositeView.extend({

	});

});