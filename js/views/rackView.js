define([
    'enums/colorValue',
	"text!templates/rackViewTemplate.html",
    "utility"
], function(ColorValue, RackViewTemplate, Utility){
	"use strict";

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

        ui: {
            rackMaterial: '.rack-material'
        },

        // Might want to use something like this in the future not sure about using it now.
        modelEvents: {
            "change:transparency": '_onChangeTransparency'
        },

        templateHelpers: {
            // Determine the color of the rack
            getColor: function(colorValue) {
                try {
                    colorValue = document.getElementsByClassName('selected-color')[0].value;
                } catch (exception) {
                    console.log(exception.message);
                    colorValue = ColorValue.Power;
                }

                var badDataFlag = false, value;
                switch (colorValue) {
                    case ColorValue.Power:
                        value = this.powerCurrent / this.powerMax;
                        if (!_.isNumber(value))
                            badDataFlag = true;
                        break;
                    case ColorValue.Weight:
                        value = this.weightCurrent / this.weightMax;
                        if (!_.isNumber(value))
                            badDataFlag = true;
                        break;
                    case ColorValue.Temperature:
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
            }
        },

        handleRackMouseover: function() {
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
            
            if(this.model.get('transparency') === '0.3')
                this.transparencyMouseover();   
        },

        transparencyMouseover: function() {
            this.model.set('transparency', '0.0');
        },

        transparencyMouseout: function() {
            this.model.set('transparency', '0.3' );
        },

        onShow: function() {
            // Not correct. Just a hack
            // Me and Russ Cannot figure out why d3 isnt correctly loading
            var d3 = require('d3');

            var componentId = this.model.get('componentId');
            var rackNode = d3.select('#rack' + componentId).node();

            rackNode.addEventListener('mouseover', this.handleRackMouseover.bind(this));
            rackNode.addEventListener('mouseout', this.transparencyMouseout.bind(this));
        },

        _onChangeTransparency: function(model, transparency){
            this.ui.rackMaterial.attr('transparency', transparency)
        }
	});

	return RackView;
});