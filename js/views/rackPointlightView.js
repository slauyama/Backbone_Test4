define([
	'text!templates/rackPointlightTemplate.html'
], function(RackPointlightTemplate){
	"use strict";

	var RackPointlightView = Backbone.Marionette.CollectionView.extend({
		tagName: 'pointlight',
		template: _.RackPointlightTemplate
	});

	return RackPointlightView;
});