// Not yet used. Will be used to set up a grid
define([
	'utility'
],function(Utility) {
		"use strict";

		var RackFloor = Backbone.Model.extend({
		    defaults: {
		        // initialize the values to extremes to find actual value  //
		        // not sure i need this anymore if I am getting values from data //
		        // will relook at this later //
				//  CODE REVIEW SA - BoundingBox should maybe be a Backbone.Model for consistencies sake, but this is also fine if it's only going to be used very minimally.
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

		    setBounds: function(data) {
		    	// Will find the max width and height
		    	this.set('maxWidth', Utility.roundTo(_.max(data, function(data) {
		    	    return data.get('floorPlanWidth');
		    	}).get('floorPlanWidth'), 2));
		    	
		    	this.set('maxHeight', Utility.roundTo(_.max(data, function(data) {
		    	    return data.get('floorPlanHeight');
		    	}).get('floorPlanHeight'), 2));

		        // Will find the min and max values for x and y position //
		        var minX = Utility.roundTo(_.min(data, function(data) {
		            return data.get('adjustedXPosition');
		        }).get('adjustedXPosition'), 2);
		          
		        var maxX = Utility.roundTo(_.max(data, function(data) {
		            return data.get('adjustedXPosition');
		        }).get('adjustedXPosition'), 2);

		        var minY = Utility.roundTo(_.min(data, function(data) {
		            return data.get('adjustedYPosition');
		        }).get('adjustedYPosition'), 2);

		        var maxY = Utility.roundTo(_.max(data, function(data) {
		            return data.get('adjustedYPosition');
		        }).get('adjustedYPosition'), 2);
		        
		        this.set('boundingBox', {
		        	minX: minX,
		        	maxX: maxX,
		        	minY: minY,
		        	maxY: maxY
		        });

		    },

		    /* Returns the front distance needed for view */
		    getFrontDistance: function() {
		      return this.get('boundingBox').minY - this.get('maxHeight') - (this.get('boundingBox').maxY - this.get('boundingBox').minX);
		    },

		    /* Returns the back distance needed for view */
		    getBackDistance: function() {
		      return this.getFrontDistance() * -1;
		    },

		    /* Returns the front distance needed for view */
		    getSideDistance: function() {
		      return this.get('boundingBox').maxX + this.get('maxWidth') + (this.get('boundingBox').maxY - this.get('boundingBox').minY);
		    },

		    /* Returns the back distance needed for view */
		    getTopDistance: function() {
		      return this.get('boundingBox').maxX - this.get('boundingBox').minY + this.get('boundingBox').maxY - this.get('boundingBox').minY;
		    }
		});

		return RackFloor;

	}
);