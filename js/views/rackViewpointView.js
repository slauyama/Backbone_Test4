define([
	"text!templates/rackViewpointTemplate.html" 
], function(RackViewpointTemplate){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointView = Backbone.Marionette.ItemView.extend({
	    tagName: 'viewpoint',
	    template: _.RackViewpointTemplate,
	});

	return RackViewpointView;
});