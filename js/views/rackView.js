define([
	"text!templates/rackViewTemplate.html"
], function(RackViewTemplate){
	"use strict";

	// console.log(RackViewTemplate);
	var RackView = Backbone.Marionette.ItemView.extend({
	    // Each rack is the type transform
	    tagName: 'transform',
	    template: _.template(RackViewTemplate),
	 
	    // Get the x and y translation from the model 
	    attributes: function() {
		    return {
	            translation: this.model.get('adjustedXPosition') + ' ' + this.model.get('adjustedYPosition') + ' 0'
	        };
	    },

        templateHelpers: {
            // Determine the color of the rack
            getColor: function(colorValue) {
                try {
                    colorValue = document.getElementsByClassName('selected-color')[0].value;
                } catch (exception) {
                    console.log(exception.message);
                    colorValue = "Power";
                }

                var badDataFlag = false, value;
                switch (colorValue) {
                    // CODE REVIEW SA - Use an enum here instead of comparing to string constant.
                    // How do I use an enum here?
                    case "Power":
                        value = this.powerCurrent / this.powerMax;
                        if (!_.isNumber(value))
                            badDataFlag = true;
                        break;
                    case "Weight":
                        value = this.weightCurrent / this.weightMax;
                        if (!_.isNumber(value))
                            badDataFlag = true;
                        break;
                    case "Temperature":
                        value = this.heatCurrent / this.coolingMax;
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
                
                if (badDataFlag) {
                    color = "steelblue";
                }
                
                return color;
            },


        },

        handleRackClick: function(view) {
            console.log("I handled the rack click", view);
            $('#' + this.model.get("componentId")).qtip();
            // qtip();
        },

        onRender: function() {
            // Not correct. Just a hack
            // Me and Russ Cannot figure out why d3 isnt correctly loading
            var d3 = require('d3');
            
            // Another hack. This will defer till all other calls on the stack are finished.
            // This allows the html elements to be rendered AND appended to the page
            _.defer(function() {
                d3.select($('#' + this.model.get("componentId"))).node()[0]
                    .addEventListener('click', function(){this.handleRackClick(this)}.bind(this));
               
            }.bind(this));
        }

	   
	});

	return RackView;
});