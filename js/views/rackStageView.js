// RackStage is the scene of the x3d element.
// Will handle the lights, views, grid, and racks
// Want to convert this view into a layout view

define([
    'collections/rackPointlights',
    'collections/rackViewpoints',
    'models/rackFloor',
    'models/rackGrid',
    'text!templates/rackStageTemplate.html',
    'views/rackGridView',
    'views/rackPointlightsView',
    'views/racksView',
    'views/rackViewpointsView'
], function(
    RackPointlights,
    RackViewpoints,
    RackFloor, 
    RackGrid,
    RackStageTemplate,
    RackGridView,
    RackPointlightsView,
    RacksView,
    RackViewpointsView
) {
    "use strict";

    var RackStageView = Backbone.Marionette.Layout.extend({
        el: '#x3dscene',
        template: _.template(RackStageTemplate),

        regions: {
            pointLightGroup:"#pointlights-group-region",
            viewpointsGroup:"#viewpoints-group-region",
            gridGroup:"#grid-group-region",
            racksGroup:"#racks-group-region"
        },

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
            // $(this.ui.scene).append(racksView.render().el);

            this.racksGroup.show(racksView); 
            
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
            // $(this.ui.scene).append(this.allLights.render().el.innerHTML);
            this.pointLightGroup.show(
                new RackPointlightsView({
                    collection: rackPointlights
                })
            );
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