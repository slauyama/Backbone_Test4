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
			// Cannot figure out for all my life how to access the width properties
			// With the width properties I could detect if there is overflow or not
			// Then I will use qtip to make a tool tip

		}
	});

	return TopListItemDataView;
});