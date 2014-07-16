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
        tagName: 'group',
        template: _.template(RackStageTemplate),

        regions: {
            pointLightGroup:"#pointlights-group-region",
            viewpointsGroup:"#viewpoints-group-region",
            gridGroup:"#grid-group-region",
            racksGroup:"#racks-group-region"
        },

        ui: {
            scene: '#x3dScene'
        },

        initialize: function(options){
            this.collection = options.collection
            this.rackFloor = new RackFloor(this.collection.models);
        },

        onRender: function() {
            //Create a new racksView and pass the collection to it
            var racksView = new RacksView({
                collection: this.collection,
                rackFloor: this.rackFloor
            });

            console.log(racksView, this.racksGroup)

            this.racksGroup.show(racksView); 

            this.addLights();
            this.addViews();
            this.addGrid(); 
        },

        // Create some lights for the scene
        addLights: function() {
            var rackPointlights = new RackPointlights();
            rackPointlights.load(this.rackFloor);

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

            this.viewpointsGroup.show(
                new RackViewpointsView({
                    collection: rackViewpoints
                })
            );
        },

        // Add the html for the grid.
        // Will toggle transparencies
        addGrid: function() {
            var rackGrid = new RackGrid();
            rackGrid.createGrid(this.rackFloor);

            this.gridGroup.show(
                new RackGridView({
                    model: rackGrid
                })
            );
        }
        
    });

    return RackStageView;
});