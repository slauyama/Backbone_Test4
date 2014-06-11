define(['views/rackView', 'models/rackProgram'], 
	function(RackView, RackProgram){
		var RacksView = Backbone.Marionette.CollectionView.extend({
		    tagName: 'scene',
		    id: 'x3dScene',

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

		var rackProgram = new RackProgram();

		var AppView = Backbone.View.extend({
		    el: $('#x3dElement')
		});

		return RacksView;
	}
);