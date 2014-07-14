define([
	'text!templates/topListItemDataTemplate.html',
], function(TopListItemDataTemplate){
	'use strict';

	var TopListItemDataView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: _.template(TopListItemDataTemplate),
		// initialize: function() {
		// 	console.log(this);
		// }
	});

	return TopListItemDataView;
});