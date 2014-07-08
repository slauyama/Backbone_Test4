// This is misleading. This file renders all the racks but it also 
// appends a scene into the x3d element.

define([
	'views/rackView'
], function(RackView){
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',

	    attributes: {
	    	// Specifically added attributes to ensure loading on
	        render: true
	    },

	    //itemview is marionette
	    itemView: RackView,

	    initialize: function() {
	    	// console.log(this.options.rackFloor)
	    	var rackFloor = this.options.rackFloor;

		    /* Create some views */
	        this.$el.append(
	            this.createViewpoint("Top View", "0 0 0", "0 0 " + (rackFloor.getTopDistance()), "0.0 0.0 0.0 0.0", '0.75')
	        );
	        this.$el.append(
	            this.createViewpoint("Front View", "0 0 0", "0 " + (rackFloor.getFrontDistance()) + " 0", "1.0 0.0 0.0 1.570", '0.95')
	        );
	        this.$el.append(
	            this.createViewpoint("Left View", "0 0 0", "" + (-1 * rackFloor.getSideDistance()) + " 0 0", "-0.50 0.50 0.5 " + (2.093 * 2), '0.75')
	        );
	        this.$el.append(
	            this.createViewpoint("Right View", "0 0 0", "" + (rackFloor.getSideDistance()) + " 0 0.25", "0.50 0.50 0.50 2.093", '0.75')
	        );
	        this.$el.append(
	            this.createViewpoint("Back View", "0 0 0", "0 " + (rackFloor.getBackDistance()) + " -.5", "0.0 0.75 0.65 3.14", '0.95')
	        );
	        this.$el.append(
	            this.createViewpoint("Perspective", "0 0 0", "" + (rackFloor.getBackDistance() / 3) + " " + (-rackFloor.getSideDistance()) + " " + (rackFloor.getTopDistance() / 3), "1.0 0.25 0.25 1.25", '0.95')
	        );

	        /* Create a Right and Left point Light */
	        this.$el.append(
	            this.createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000', "" + (rackFloor.getSideDistance()) + " 0 0", '200.0')
	        );
	        
	        this.$el.append(
	            this.createPointlight('.50', '1.0 1.0 1.0', '1.0000 0.0000 0.0000', "" + (-1 * rackFloor.getSideDistance()) + " 0 0", '200.0')
	        );

	    },

	    // Becuase I am using Marionette
	    // Whenever I pass in a collection to the RackView
	    // It will automiatically render
	    // render: function() {

	    // These functions are not used but rather they help me remember what I can do
	    onBeforeRender: function() {
	        
	    },

	    onRender: function() {
	           
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
        }

	});

	return RacksView;
});