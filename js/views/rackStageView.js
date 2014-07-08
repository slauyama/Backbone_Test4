// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView',
    'views/rackOptionsView'
], function(RacksView, RackOptionsView) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene',
            rackOptions: '#rack-view-options',
        },

        initialize: function(collection){
				
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection
            });

			// Attach's the rendered racksView to the #x3dScene
            $(this.ui.scene).append(racksView.render().el);
            // Not sure what this does.
            // I think it triggers the show method and its event
            racksView.triggerMethod('show');

            var rackOptionsView = new RackOptionsView();
            // $(this.ui.rackOptions).append(rackOptionsView.render().el);

            this.createGrid();
        },

        createGrid: function(bounds) {
            var connections, coordinateConnections, coordinates, grid, gridStart, set, shape;
            
            /* Attach a shape to the scene */
            shape = $(this.ui.scene).append('Transform').append('shape').attr('id', 'grid');

            /* Give it a light grey color with transparency */
            shape.append('appearance').append('material').attr('id', 'grid-material').attr('diffuseColor', '0.8, 0.8, 0.8').attr('transparency', '0.65');

            /* coordinateConnections: string representing connection of coordinates
            all coordinates are connected until it reaches a -1
            1, 2, -1, 3, 4 will connect coordinate 1 and 2
            but will not connect coordinate 2 and 3
            */
            coordinateConnections = "";

            /* coordinates is a string representing the coordinates (x, y, z) */
            coordinates = "";

            /* connections signifies what set of line user is on */
            connections = 0;

            /* rounding to a .6 because that is the standard grid interval */
            grid.HeightStart = Math.roundTo(Math.ceil((bounds.boundingBox.minY - bounds.maxHeight) / 0.6 - 1) * 0.6, 2);
            grid.HeightEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxY + bounds.maxHeight) / 0.6 + 1) * 0.6, 2);
            grid.WidthStart = Math.roundTo(Math.ceil((bounds.boundingBox.minX - bounds.maxWidth) / 0.6 - 1) * 0.6, 2);
            grid.WidthEnd = Math.roundTo(Math.ceil((bounds.boundingBox.maxX + bounds.maxWidth) / 0.6 + 1) * 0.6, 2);

            /* Verticle lines on the Grid */
            gridStart = grid.WidthStart;
            while (gridStart <= grid.WidthEnd) {
                coordinates += "" + gridStart + " " + grid.HeightStart + " -1 ";
                coordinates += "" + gridStart + " " + grid.HeightEnd + " -1 ";
                coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
                gridStart = Math.roundTo(gridStart + 0.6, 2);
                connections += 2;
            }

            /* Horizontal Lines on the Grid */
            gridStart = grid.HeightStart;
            while (gridStart <= grid.HeightEnd) {
                coordinates += "" + grid.WidthStart + " " + gridStart + " -1 ";
                coordinates += "" + grid.WidthEnd + " " + gridStart + " -1 ";
                coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
                gridStart = Math.roundTo(gridStart + 0.6, 2);
                connections += 2;
            }

            /* set the final strings to the proper place */
            set = shape.append('indexedLineSet').attr('coordIndex', '#{coordinateConnections}');
            set.append('coordinate').attr('point', "" + coordinates);
        }
    });

    return RackStageView;
});