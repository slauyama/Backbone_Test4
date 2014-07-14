define([
	"models/rackPointlight"
], function(RackPointlight){
	"use strict";

	var RackPointlights = Backbone.Collection.extend({
		model: RackPointlight,

	    load: function(rackFloor){
	    	// Create a left and right point light
	        this.add({
	            intensity: '.50',
	            color: '1.0 1.0 1.0',
	            attenuation: '1.0 .05 0.01',
	            location: (rackFloor.getSideDistance()) + " 0 0",
	            radius: '200.0'
	        });
	        this.add({
	            intensity: '.50',
	            color: '1.0 1.0 1.0',
	            attenuation: '1.0 .05 0.01',
	            location: (-1 * rackFloor.getSideDistance()) + " 0 0",
	            radius: '200.0'
	        });
	    }
	});

	return RackPointlights;

});