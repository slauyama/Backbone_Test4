define([
	"views/rackViewpointView" 
], function(RackViewpointView){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointsViews = Backbone.Marionette.CollectionView.extend({
	    childView: RackViewpointView,
	    tagName: 'group',

	    initialize: function() {
	    	
	    }
	});

	return RackViewpointsViews;
});