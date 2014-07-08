// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView',
    'models/rackFloor',
    'views/rackOptionsView',
    'utility'
], function(RacksView, RackFloor, RackOptionsView, Utility) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            element: '#x3dElement',
            scene: '#x3dScene',
            rackOptions: '#rack-view-options',
        },

        initialize: function(collection){
			var rackFloor = new RackFloor(collection.models);

            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection
            });

			// Attach's the rendered racksView to the #x3dScene
            $(this.ui.element).append(racksView.render().el);
            // Not sure what this does.
            // I think it triggers the show method and its event
            // I am not sure what the show method does or if it is needed
            racksView.triggerMethod('show');

            var rackOptionsView = new RackOptionsView();
            // $(this.ui.rackOptions).append(rackOptionsView.render().el);

            // Does not append the html elements but rather just text
            // this.createGrid(rackFloor);

            /* Create some views */
            $(this.ui.scene).append(this.createViewpoint("Top View", "0 0 0", "0 0 " + (rackFloor.getTopDistance()), "0.0 0.0 0.0 0.0", '0.75'));
            $(this.ui.scene).append(this.createViewpoint("Front View", "0 0 0", "0 " + (rackFloor.getFrontDistance()) + " 0", "1.0 0.0 0.0 1.570", '0.95'));
            $(this.ui.scene).append(this.createViewpoint("Left View", "0 0 0", "" + (-1 * rackFloor.getSideDistance()) + " 0 0", "-0.50 0.50 0.5 " + (2.093 * 2), '0.75'));
            $(this.ui.scene).append(this.createViewpoint("Right View", "0 0 0", "" + (rackFloor.getSideDistance()) + " 0 0.25", "0.50 0.50 0.50 2.093", '0.75'));
            $(this.ui.scene).append(this.createViewpoint("Back View", "0 0 0", "0 " + (rackFloor.getBackDistance()) + " -.5", "0.0 0.75 0.65 3.14", '0.95'));
            $(this.ui.scene).append(this.createViewpoint("Perspective", "0 0 0", "" + (rackFloor.getBackDistance() / 3) + " " + (-rackFloor.getSideDistance()) + " " + (rackFloor.getTopDistance() / 3), "1.0 0.25 0.25 1.25", '0.95'));

            /* Create a Right and Left point Light */
            $(this.ui.scene).append(
                this.createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000', "" + (rackFloor.getSideDistance()) + " 0 0", '200.0')
            );
            
            $(this.ui.scene).append(
                this.createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000', "" + (-1 * rackFloor.getSideDistance()) + " 0 0", '200.0')
            );
        },

        /* Append the different viewpoints to the scene */
        createViewpoint: function(id, centerOfRotation, position, orientation, fieldOfView) {
            return "<viewpoint id='" + id + "' centerOfRotation='"
                + centerOfRotation + "' position='" + position + "' orientation='" +
                orientation + "' fieldOfView='" + fieldOfView +"'></viewpoint>";
        },

        /* Append the different lights to the scene */
        /* Color - input is a 0 to 1 value for r, g, and b */
        createPointlight: function(intensity, color, attenuation, location, radius) {
            return "<pointLight intensity='" + intensity +
                "' color='" + color + "' attenuation='" + attenuation + "' location='"
                + location + "' radius='" + radius + "'></pointLight>";
        },

        createGrid: function(rackFloor) {
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
            grid = {};
            grid.HeightStart = Utility.roundTo(Math.ceil((rackFloor.get('boundingBox').minY - rackFloor.get('maxHeight') ) / 0.6 - 1) * 0.6, 2);
            grid.HeightEnd = Utility.roundTo(Math.ceil((rackFloor.get('boundingBox').maxY + rackFloor.get('maxHeight') ) / 0.6 + 1) * 0.6, 2);
            grid.WidthStart = Utility.roundTo(Math.ceil((rackFloor.get('boundingBox').minX - rackFloor.get('maxWidth') ) / 0.6 - 1) * 0.6, 2);
            grid.WidthEnd = Utility.roundTo(Math.ceil((rackFloor.get('boundingBox').maxX + rackFloor.get('maxWidth') ) / 0.6 + 1) * 0.6, 2);

            /* Verticle lines on the Grid */
            gridStart = grid.WidthStart;
            while (gridStart <= grid.WidthEnd) {
                coordinates += "" + gridStart + " " + grid.HeightStart + " -1 ";
                coordinates += "" + gridStart + " " + grid.HeightEnd + " -1 ";
                coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
                gridStart = Utility.roundTo(gridStart + 0.6, 2);
                connections += 2;
            }

            /* Horizontal Lines on the Grid */
            gridStart = grid.HeightStart;
            while (gridStart <= grid.HeightEnd) {
                coordinates += "" + grid.WidthStart + " " + gridStart + " -1 ";
                coordinates += "" + grid.WidthEnd + " " + gridStart + " -1 ";
                coordinateConnections += "" + connections + " " + (connections + 1) + " -1 ";
                gridStart = Utility.roundTo(gridStart + 0.6, 2);
                connections += 2;
            }

            /* set the final strings to the proper place */
            set = shape.append('indexedLineSet').attr('coordIndex', '#{coordinateConnections}');
            set.append('coordinate').attr('point', "" + coordinates);
        }
    });

    return RackStageView;
});

// Transform
//     shape
//         appearance
//         material
//         indexedLineSet
//         coordinate

        
// <Transform render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" center="0,0,0" translation="0,0,0" rotation="0,0,0,0" scale="1,1,1" scaleorientation="0,0,0,0">
//     <shape id="grid" render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" ispickable="true">
//         <appearance sorttype="auto">
//             <material id="gridMaterial" diffusecolor="#4682b4" transparency="0.65" ambientintensity="0.2" emissivecolor="0,0,0" shininess="0.2" specularcolor="0,0,0">
//             </material>
//         </appearance>
//         <indexedLineSet coordindex="#{coordinateConnections}" solid="true" ccw="true" usegeocache="true" lit="true" colorpervertex="true" colorindex="">
//             <coordinate point="-6.6 -5.4 -1 -6.6 5.4 -1 -6 -5.4 -1 -6 5.4 -1 -5.4 -5.4 -1 -5.4 5.4 -1 -4.8 -5.4 -1 -4.8 5.4 -1 -4.2 -5.4 -1 -4.2 5.4 -1 -3.6 -5.4 -1 -3.6 5.4 -1 -3 -5.4 -1 -3 5.4 -1 -2.4 -5.4 -1 -2.4 5.4 -1 -1.8 -5.4 -1 -1.8 5.4 -1 -1.2 -5.4 -1 -1.2 5.4 -1 -0.6 -5.4 -1 -0.6 5.4 -1 0 -5.4 -1 0 5.4 -1 0.6 -5.4 -1 0.6 5.4 -1 1.2 -5.4 -1 1.2 5.4 -1 1.8 -5.4 -1 1.8 5.4 -1 2.4 -5.4 -1 2.4 5.4 -1 3 -5.4 -1 3 5.4 -1 3.6 -5.4 -1 3.6 5.4 -1 4.2 -5.4 -1 4.2 5.4 -1 4.8 -5.4 -1 4.8 5.4 -1 5.4 -5.4 -1 5.4 5.4 -1 6 -5.4 -1 6 5.4 -1 -6.6 -5.4 -1 6 -5.4 -1 -6.6 -4.8 -1 6 -4.8 -1 -6.6 -4.2 -1 6 -4.2 -1 -6.6 -3.6 -1 6 -3.6 -1 -6.6 -3 -1 6 -3 -1 -6.6 -2.4 -1 6 -2.4 -1 -6.6 -1.8 -1 6 -1.8 -1 -6.6 -1.2 -1 6 -1.2 -1 -6.6 -0.6 -1 6 -0.6 -1 -6.6 0 -1 6 0 -1 -6.6 0.6 -1 6 0.6 -1 -6.6 1.2 -1 6 1.2 -1 -6.6 1.8 -1 6 1.8 -1 -6.6 2.4 -1 6 2.4 -1 -6.6 3 -1 6 3 -1 -6.6 3.6 -1 6 3.6 -1 -6.6 4.2 -1 6 4.2 -1 -6.6 4.8 -1 6 4.8 -1 -6.6 5.4 -1 6 5.4 -1 ">
//             </coordinate>
//         </indexedLineSet>
//     </shape>
// </Transform>