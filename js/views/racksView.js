// This is misleading. This file renders all the racks but it also 
// appends a scene into the x3d element.

// Going to switch this view into a layout view. 

define([
	'collections/rackPointlights',
	'collections/rackViewpoints',
	'models/rackGrid',
	'views/rackGridView',
	'views/rackPointlightsView',
	'views/rackView',
	'views/rackViewpointsView'
], function(
	RackPointlights,
	RackViewpoints,
	RackGrid,
	RackGridView,
	RackPointlightsView,
	RackView, 
	RackViewpointsView
){
	// Change Type of View to Item View
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',
	    id: 'innerScene',
	    itemView: RackView,

	    initialize: function(options) {
	    	this.rackFloor = options.rackFloor;

	    	this.addLights();
	    	this.addViews();

	    	this.addGrid();
	    },

	    // Create some lights for the scene
        addLights: function() {
            
            var rackPointlights = new RackPointlights();
        	rackPointlights.load(this.rackFloor);

            this.allLights = new RackPointlightsView({
            	collection: rackPointlights
            });

			// Appending the innerHTML to avoid adding on the outer div
			// Probably not the right way to do this
			this.$el.append(this.allLights.render().el.innerHTML);
        },

        // Create some viewpoints for the scene
	    addViews: function() {
		    var rackViewpoints = new RackViewpoints();
        	rackViewpoints.load(this.rackFloor);

        	this.allViews = new RackViewpointsView({
        		collection: rackViewpoints
        	});

        	this.$el.append(this.allViews.render().el.innerHTML);
	    },

	    // Add the html for the grid.
	    // Will toggle transparencies
	    addGrid: function() {
	    	this.rackGrid = new RackGrid();
	    	this.rackGrid.createGrid(this.rackFloor);

	    	this.rackGridView = new RackGridView({
	    	    model: this.rackGrid
	    	});

	    	this.$el.append(this.rackGridView.render().el.innerHTML);
	    }


	});

	return RacksView;
});