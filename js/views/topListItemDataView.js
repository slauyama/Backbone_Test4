define([
	'text!templates/topListItemDataTemplate.html',
	'utility'
], function(TopListItemDataTemplate, Utility){
	'use strict';

	var TopListItemDataView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: _.template(TopListItemDataTemplate),
		templateHelpers: {
			roundToHelper: function(value) {
				return Utility.roundTo(value, 2);
			}
		},

		onRender: function() {
			console.log("TopListItemDataView is rendering", this.$el);
		}
	});

	return TopListItemDataView;
});