define([
	'text!templates/topListItemDataTemplate.html',
], function(TopListItemDataTemplate){
	'use strict';

	var TopListItemDataView = Backbone.Marionette.ItemView.extend({
		template: _.template(TopListItemDataTemplate)
	});

	return TopListItemDataView;
});