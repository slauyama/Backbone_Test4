// RackStage is the scene of the x3d element.
// Will handle the lights, views, grid, and racks
// Want to convert this view into a layout view

define([
    // 'templates/rackStageLayoutView'
    'collections/rackPointlights',
    'collections/rackViewpoints',
    'models/rackFloor',
    'models/rackGrid',
    'views/rackGridView',
    'views/rackPointlightsView',
    'views/racksView',
    'views/rackViewpointsView'
], function(
    RackPointlights,
    RackViewpoints,
    RackFloor, 
    RackGrid,
    RackGridView,
    RackPointlightsView,
    RacksView,
    RackViewpointsView
) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        tagName: 'group',
        template: _.template(''),

        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene',
        },

        initialize: function(collection){
			var rackFloor = new RackFloor(collection.models);
            this.rackFloor = rackFloor;
            
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection,
                rackFloor: rackFloor
            });

			// Attach's the rendered racksView to the #x3dScene
            // I would like something like this in the future racksView.render();
            $(this.ui.scene).append(racksView.render().el);
           
           // Not sure what this does.
            // I think it triggers the show method and its event
            // I am not sure what the show method does or if it is needed
            racksView.triggerMethod('show'); 
            
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
            $(this.ui.scene).append(this.allLights.render().el.innerHTML);
        },

        // Create some viewpoints for the scene
        addViews: function() {
            var rackViewpoints = new RackViewpoints();
            rackViewpoints.load(this.rackFloor);

            this.allViews = new RackViewpointsView({
                collection: rackViewpoints
            });

            $(this.ui.scene).append(this.allViews.render().el.innerHTML);
        },

        // Add the html for the grid.
        // Will toggle transparencies
        addGrid: function() {
            this.rackGrid = new RackGrid();
            this.rackGrid.createGrid(this.rackFloor);

            this.rackGridView = new RackGridView({
                model: this.rackGrid
            });

            $(this.ui.scene).append(this.rackGridView.render().el.innerHTML);
        }
        
    });

    return RackStageView;
});