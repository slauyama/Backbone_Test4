define([
	"text!templates/rackViewpointTemplate.html" 
], function(RackViewpointTemplate){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointView = Backbone.Marionette.ItemView.extend({
	    template: _.template(RackViewpointTemplate),

	    onRender: function() {
	    	// Get rid of that pesky wrapping-div.
	    	// Assumes 1 child element present in template.
	    	this.$el = this.$el.children();
	    	// Unwrap the element to prevent infinitely 
	    	// nesting elements during re-render.
	    	this.$el.unwrap();
	    	this.setElement(this.$el);
	    }

	});

	return RackViewpointView;
});