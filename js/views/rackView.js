// Templating not working
define([
	"text!rackViewTemplate.html" //Trying to pass in a template to the rackView
], function(RackViewTemplate){
	"use strict";

	console.log(RackViewTemplate);
	var RackView = Backbone.Marionette.ItemView.extend({
	    // Each rack is the type transform
	    tagName: 'transform',

	    // template: _.template(RackViewTemplate),
	    // console.log(RackViewTemplate);

	    // Get the x and y translation from the model 
	    attributes: function() {
		    return {
	            translation: this.model.get('adjustedXPosition') + ' ' + this.model.get('adjustedYPosition') + ' 0'
	        };
	    },

	    initialize: function() {
	        //_.bindAll(this, 'render');
	    },

	    // Determine the color of the rack
	    getColor: function(colorValue) {
	        var badDataFlag = false, value;
	        
	        switch (colorValue) {
	            case "Power":
	                value = this.model.get('powerCurrent') / this.model.get('powerMax');
	                if (!_.isNumber(value))
	                    badDataFlag = true;
	                break;
	            case "Weight":
	                value = this.model.get('weightCurrent') / this.model.get('weightMax');
	                if (!_.isNumber(value))
	                    badDataFlag = true;
	                break;
	            case "Temperature":
	                value = this.model.get('heatCurrent') / this.model.get('coolingMax');
	                if (!_.isNumber(value))
	                    badDataFlag = true;
	                break;
	            default:
	                badDataFlag = true;
	                break;
	        }

	        var red, green, redString, greenString, color; 
	        if (value < 0.5) {
	            red = Math.floor(value * 255);
	            green = 200;
	        } else {
	            red = 255;
	            green = Math.floor((1 - value) * 255);
	        }

	        redString = (red < 16 ? "0" : "") + red.toString(16);
	        greenString = (green < 16 ? "0" : "") + green.toString(16);

	        color = "#" + redString + greenString + "00";
	        if (badDataFlag) 
	            color = "steelblue";
	        
	        return color;
	    },

	    // How the rackView will be rendered
	    render: function(){
	    	console.log("rendering RackView");
	        var shape = "<shape id='" + this.model.get('componentId') + "' class='rack'>";
	        var appearance = "<appearance sorttype='auto'>";
	        var material = "<material ambientintensity='0.2'" + 
	            " diffusecolor=" + this.getColor('Power') + " shininess='0.2'>";
	        var closeAppearance = "</material></appearance>";
	        var box = "<box size='"+ this.model.get('floorPlanWidth') + ' ' +
	            (this.model.get('floorPlanHeight') - 0.1) + ' ' + 
	            this.model.get('height') + "'></box>";
	        var closeTransform = "</shape></transform>";

	        this.$el.html(shape + appearance + material + closeAppearance 
	            + box + closeTransform);
	        return this;
	    }
	});

	return RackView;
});