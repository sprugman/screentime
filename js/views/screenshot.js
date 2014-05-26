ST.module("Views", function(Mod, App, Backbone, Marionette, $, _){
	"use strict";

	Mod.Screenshot = Backbone.Marionette.ItemView.extend({
		template: '#screenshot-view',
		className: 'shot',
		initialize: function(options) {
			this.$el.attr('data-gid', this.model.get('globalIndex'));
		},
		events: {
			'click': function(evt) { 
				// TODO: turn this into a view
				var $modal = $('#image-zoom'),
					$fullImg = $('<img />').attr('src', this.model.get('fullSrc')),
					idx = this.model.get('globalIndex'),
					$prev = $modal.find('.modal-header .prev'),
					$next = $modal.find('.modal-header .next'),
					$imgContainer = $('<figure />').addClass('zoomed').html($fullImg);

				if (idx === 0) { 
					$prev.prop('disabled', true); 
				} else {
					$prev.prop('disabled', false); 
				}
				if (idx === this.model.collection.length -1) {
					$next.prop('disabled', true); 
				} else {
					$next.prop('disabled', false);
				}
				$prev.attr('data-current-idx', idx);
				$next.attr('data-current-idx', idx);
				$modal.find('.modal-body').html($imgContainer);
				$modal.find('.modal-header .caption').html(this.model.get('moment').calendar());
				$modal.modal();
			}
		}
	});

	Mod.Activity = Backbone.Marionette.CompositeView.extend({
		itemView: Mod.Screenshot,
		template: '#screenshot-group-view',
		itemViewContainer: '.shots',
		className: 'shot-group list-group-item',
		initialize: function() {
			this.collection = this.model.get('screenshots');
		}
	});

	Mod.ActivityGroup = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.Activity,
		className: 'list-group'
	});

});