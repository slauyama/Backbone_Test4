// Individual Item for a todo list
define([
	'text!templates/topListItemTemplate.html',
	'models/topListItem'
], function(TopListItemTemplate, TopListItem){
	"use strict";

	var TopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		classNames: 'topListItem',
		template: _.template(TopListItemTemplate),

		initialize: function(options) {
			// Can i just declare a new Backbone model for simple things
			// this.model = new Backbone.Model ({
		}
	});

	return TopListItemView;
});