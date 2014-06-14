define([
	'views/rackView'
], function(RackView){
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',
	    itemViewContainer: '#x3dScene',

<<<<<<< HEAD
	    attributes: {
=======
		//  CODE REVIEW SA - You don't need a function for this. It can just be attributes: {}, only need function when need to do dynamic code or read from model.
	    attributes: function() {
>>>>>>> origin/templating
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