define([
	"text!templates/rackViewpointTemplate.html" 
], function(RackViewpointTemplate){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'viewpoint',
	    template: _.template(RackViewpointTemplate),

	    initialize: function(options) {
	    	this.id = this.options.id;
	    }
	});

	return RackViewpointView;
});