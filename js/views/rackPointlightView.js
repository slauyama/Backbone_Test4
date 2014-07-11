// This view currently does not need a template.
// This might change in the future.

define([
	'text!templates/rackPointlightTemplate.html'
], function(RackPointlightTemplate){
	"use strict";

	var RackPointlightView = Backbone.Marionette.ItemView.extend({
		tagName: 'pointlight',
		template: _.template(RackPointlightTemplate),

		initialize: function() {
			console.log("initialize RackPointlightView")
			console.log(this);
		},

		
	});

	return RackPointlightView;
});