// Not yet used. Will be used to set up a grid
define(function() {
		"use strict";

		var RackFloor = Backbone.Model.extend({
		    defaults: {
		        // initialize the values to extremes to find actual value  //
		        // not sure i need this anymore if I am getting values from data //
		        // will relook at this later //
		        boundingBox: {
		            minX: Number.MAX_VALUE,
		            maxX: Number.MIN_VALUE,
		            minY: Number.MAX_VALUE,
		            maxY: Number.MIN_VALUE                        
		        },

		        // find the max width and height of a rack to extend the grid and views
		        maxWidth: 0,
		        maxHeight: 0
		    },

		    initialize: function(data) {
		        this.setBounds(data)
		    },

		    // Recalculate the bounds based on the data //
		    // Was used if i want to change plans. Need to relook at the scale. //
		    setBounds: function(data) {
		        // Will find the min and max values for x and y position //
		        this.boundingBox.minX = Math.roundTo(d3.min(data, function(data) {
		            return data.adjustedXPosition;
		        }), 2);
		          
		        this.boundingBox.maxX = Math.roundTo(d3.max(data, function(data) {
		            return data.adjustedXPosition;
		        }), 2);

		        this.boundingBox.minY = Math.roundTo(d3.min(data, function(data) {
		            return data.adjustedYPosition;
		        }), 2);

		        this.boundingBox.maxY = Math.roundTo(d3.max(data, function(data) {
		            return data.adjustedYPosition;
		        }), 2);
		        
		        // Will find the max width and height
		        this.maxWidth = Math.roundTo(d3.max(data, function(data) {
		            return data.floorPlanWidth;
		        }), 2)
		        
		        this.maxHeight = Math.roundTo(d3.max(data, function(data) {
		            return data.floorPlanHeight;
		        }), 2)
		    },
		});

		return RackFloor;

	}
);