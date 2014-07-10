// This view currently does not need a template.
// This might change in the future.

define([
	// 'text!templates/rackPointlightTemplate.html'
], function(/*RackPointlightTemplate*/){
	"use strict";

	var RackPointlightView = Backbone.View.extend({
		tagName: 'pointlight',

		// template: _.template(RackPointlightTemplate)
	});

	return RackPointlightView;
});