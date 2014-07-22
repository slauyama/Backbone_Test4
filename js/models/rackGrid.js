define([
	'utility'
], function (Utility) {
	"use strict";

	var RackGrid = Backbone.Model.extend({
		defaults: {
			color: "",
			transparency: "",
			coordinateConnection: "",
			coordinates: ""
		},

		initialize: function() {
			this.set('color', '0.8, 0.8, 0.8');
		    this.set('transparency', '0.65');
		},

		createGrid: function(rackFloor) {
		    var coordinateConnections, coordinates, connections, grid, gridStart, color, transparency;

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

			this.set('coordinateConnections', coordinateConnections);
		    this.set('coordinates', coordinates);

		}
	});

	return RackGrid;
});