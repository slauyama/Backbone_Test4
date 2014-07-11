// This is misleading. This file renders all the racks but it also 
// appends a scene into the x3d element.

define([
	'views/rackView',
	'collections/rackViewpoints',
	'views/rackViewpointsView',
	'collections/rackPointlights',
	'views/rackPointlightsView'
], function(
	RackView, 
	RackViewpoints,
	RackViewpointsView,
	RackPointlights,
	RackPointlightsView
){
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',
	    id: 'innerScene',

	    //itemview is marionette
	    itemView: RackView,

	    initialize: function(options) {
	    	this.rackFloor = options.rackFloor;

	    	this.addViews();
	    	this.addLights();
	    },

	    addViews: function() {
	    	var that = this;
		    /* Create some views */
		    var rackViewpoints = new RackViewpoints();
        	rackViewpoints.load(this.rackFloor);

        	this.allViews = new RackViewpointsView({
        		collection: rackViewpoints
        	});


        	this.$el.append(this.allViews.render().el.innerHTML);
	    },

        addLights: function() {
            
            var rackPointlights = new RackPointlights();
        	rackPointlights.load(this.rackFloor);

            this.allLights = new RackPointlightsView({
            	collection: rackPointlights
            });

			// Appending the innerHTML to avoid adding on the outer div
			// Probably not the right way to do this
			this.$el.append(this.allLights.render().el.innerHTML);
        }

	});

	return RacksView;
});