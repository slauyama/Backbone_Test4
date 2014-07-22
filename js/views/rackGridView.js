define([
	"models/rackGrid",
	"text!templates/rackGridTemplate.html"
], function(RackGrid, RackGridTemplate) {

	var RackGridView = Backbone.Marionette.ItemView.extend({
		tagName: 'transform',
		template: _.template(RackGridTemplate),

		modelEvents: {
			"change:transparency" : "render"
		},

		// Listens to the channel for the "gridClicked" event 
		initialize: function() {
			this.listenTo(Backbone.Wreqr.radio.channel('grid-options').vent, "gridClicked", this._toggleTransparency)
		},

		_toggleTransparency: function() {
			this.model.set('transparency', this.model.get('transparency') === "1.0" ? ".65" : "1.0")
		}
	});

	return RackGridView

});