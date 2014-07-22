// This view is solely responsible for handling the racks.
// All racks will be inside a group element. 
// This group element will have events bound to it.

define([
	'views/rackView'
], function(
	RackView 
){
	// Change Type of View to Item View
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    childView: RackView,
	    tagName: 'group',

	    initialize: function() {
	    	this.listenTo(Backbone.Wreqr.radio.channel('rack-options').vent, 'changeColor', this.render);
	    	this.listenTo(Backbone.Wreqr.radio.channel('rack-options').vent, 'toggleTextTransparency', this.toggleAllTransparency);
	    },

	    toggleAllTransparency: function() {
	    	// For each model within the collection, toggle the transparency
	    	this.collection.forEach(function(model) {
	    		model.set("textTransparency", model.get('textTransparency') === "0" ? "1.0" : "0");
	    	});

	    	// // Not sure if calling render here is a good idea.
	    	// this.render();
	    }
	});

	return RacksView;
});