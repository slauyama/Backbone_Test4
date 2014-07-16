define([
	"views/rackViewpointView" 
], function(RackViewpointView){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointsViews = Backbone.Marionette.CollectionView.extend({
	    itemView: RackViewpointView,
	    tagName: 'group'
	});

	return RackViewpointsViews;
});