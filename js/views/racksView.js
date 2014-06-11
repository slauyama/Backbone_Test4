define(['views/rackView'], 
	function(RackView){
		var RacksView = Backbone.Marionette.CollectionView.extend({
		    tagName: 'scene',
		    itemViewContainer: '#x3dScene',

		    attributes: function() {
		    	// Specifically added attributes to ensure loading on
		        return {
		            render: true,
		        };
		    },

		    //itemview is marionette
		    itemView: RackView,

		    initialize: function() {

		    },

		    // Becuase I am using Marionette
		    // Whenever I pass in a collection to the RackView
		    // It will automiatically render
		    // render: function() {
		    onBeforeRender: function() {
		        
		    },
		    onRender: function() {
		           
		    }

		});
		console.log("returning Rack(s)View");
		return RacksView;
	}
);