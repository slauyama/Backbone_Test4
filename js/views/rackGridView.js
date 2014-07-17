define([
	"models/rackGrid",
	"text!templates/rackGridTemplate.html"
], function(RackGrid, RackGridTemplate) {

	var RackGridView = Backbone.Marionette.ItemView.extend({
		tagName: 'transform',
		template: _.template(RackGridTemplate)
	});

	return RackGridView

});