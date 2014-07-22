// This is a collection of rackPointlights View
// Passes on the rendering to the rackpointlightview

define([
	'views/rackPointlightView'
], function(RackPointlightView){
	"use strict";

	var RackPointlightsView = Backbone.Marionette.CollectionView.extend({
		childView: RackPointlightView,
		tagName: 'group'
	});

	return RackPointlightsView;
});