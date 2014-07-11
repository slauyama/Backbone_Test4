// This view does use a template
// Not sure if it can be built without one but 
// I want to use the attributes property if it is possible

define([
	'text!templates/rackPointlightTemplate.html'
], function(RackPointlightTemplate){
	"use strict";

	var RackPointlightView = Backbone.Marionette.ItemView.extend({
		template: _.template(RackPointlightTemplate),

		// Removes the outer div element. 
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

	return RackPointlightView;
});