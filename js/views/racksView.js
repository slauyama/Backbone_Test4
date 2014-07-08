define([
	'views/rackView'
], function(RackView){
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',

	    attributes: {
	    	// Specifically added attributes to ensure loading on
	        render: true
	    },

	    //itemview is marionette
	    itemView: RackView,

	    initialize: function() {

	    },

	    // Becuase I am using Marionette
	    // Whenever I pass in a collection to the RackView
	    // It will automiatically render
	    // render: function() {

	    // These functions are not used but rather they help me remember what I can do
	    onBeforeRender: function() {
	        
	    },
	    onRender: function() {
	           
	    }

	});

	return RacksView;
});