// Individual Item for a todo list
define([
	'text!templates/topListItemTemplate.html',
	'models/topListItem',
	'views/topListItemDataView'
], function(TopListItemTemplate, TopListItem, TopListItemDataView){
	"use strict";

	var TopListItemView = Backbone.Marionette.CompositeView.extend({
		classNames: 'topListItem',
		template: _.template(TopListItemTemplate),
		childView: TopListItemDataView,
		itemViewContainer: '.leader',

		initialize: function(){
			// Not good practice at all
			// This file is only getting one model from the Collection View
			// This hack allows you to specify what the collection is
			this.collection = this.model.get('data');
		}
	});

	return TopListItemView;
});