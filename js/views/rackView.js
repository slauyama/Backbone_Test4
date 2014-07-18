define([
	"text!templates/rackViewTemplate.html",
    "utility"
], function(RackViewTemplate, Utility){
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

        handleRackClick: function() {
            // Not sure if i can use a qtip while using the canvas.
            // Atleast I could use a model and view. '
            // Not sure how i want the data displayed
            document.getElementById("ComponentID-Data").innerHTML = this.model.get('componentId');
            document.getElementById("Name-Data").innerHTML = this.model.get('name');
            document.getElementById("Power-Data").innerHTML = Utility.roundTo(this.model.get('powerCurrent')) + "/" + Utility.roundTo(this.model.get('powerPlanned')) + "/" + Utility.roundTo(this.model.get('powerMax'));
            document.getElementById("Heat-Data").innerHTML = Utility.roundTo(this.model.get('heatCurrent')) + "/" + Utility.roundTo(this.model.get('heatPlanned')) + "/" + Utility.roundTo(this.model.get('coolingMax'));
            document.getElementById("Weight-Data").innerHTML = Utility.roundTo(this.model.get('weightCurrent')) + "/" + Utility.roundTo(this.model.get('weightPlanned')) + "/" + Utility.roundTo(this.model.get('weightMax'));
            document.getElementById("UsedUnits-Data").innerHTML = this.model.get('usedUnitsCurrent') + "/" + this.model.get('usedUnitsPlanned');
            document.getElementById("UnitLocation-Data").innerHTML = this.model.get('largestUnitLocation');
            document.getElementById("UnitSize-Data").innerHTML = this.model.get('largestUnitSize');
            // document.getElementById("PowerAD-Data").innerHTML = this.model.get('powerActualDerivation');
        },

        onRender: function() {
            // Not correct. Just a hack
            // Me and Russ Cannot figure out why d3 isnt correctly loading
            var d3 = require('d3');
            
            // Another hack. This will defer till all other calls on the stack are finished.
            // This allows the html elements to be rendered AND appended to the page
            _.defer(function() {
                d3.select('#rack' + this.model.get("componentId")).node()
                    .addEventListener('mouseover', function(){
                        this.handleRackClick()
                    }.bind(this));
            }.bind(this));
        }

	   
	});

	return RackView;
});