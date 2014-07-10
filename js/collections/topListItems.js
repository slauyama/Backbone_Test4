define([
	"models/topListItem"
], function(TopListItem){

	var TopListItems = Backbone.Collection.extend({
		model: TopListItem
	});

	return TopListItems;

});