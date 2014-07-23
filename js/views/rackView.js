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
                id: "rack" + this.model.get('componentId'),
                translation: this.model.get('adjustedXPosition') + ' ' + this.model.get('adjustedYPosition') + ' 0'
            };
        },

        // When the models property changes run the private function
        modelEvents: {
            'change:rackTransparency': '_onChangeRackTransparency',
            'change:textTransparency': '_onChangeTextTransparency'
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
                    case ColorValue.Heat:
                        value = this.heatCurrent / this.coolingMax;
                        if (!_.isNumber(value))
                            badDataFlag = true;
                        break;
                    default:
                        badDataFlag = true;
                        break;
                }

                var red, green, redString, greenString, color; 
                red = value < 0.5 ? Math.floor(value * 255) : 255;
                green = value < 0.5 ? 200 : Math.floor((1 - value) * 255);

                redString = (red < 16 ? "0" : "") + red.toString(16);
                greenString = (green < 16 ? "0" : "") + green.toString(16);

                color = "#" + redString + greenString + "00";
                
                if (badDataFlag) {
                    color = "steelblue";
                }
                
                return color;
            }
        },

        ui: {
            rackMaterial: '.rack-material',
            textMaterial: '.text-material',
            componentId: '#ComponentID-Data'
        },

        handleRackMouseover: function() {
            
            Backbone.Wreqr.radio.channel('hover-rack').vent.trigger('hoverRack', {
                componentIDData: this.model.get('componentId'),
                nameData: this.model.get('name'),
                powerData: Utility.roundTo(this.model.get('powerCurrent')) + "/" + Utility.roundTo(this.model.get('powerPlanned')) + "/" + Utility.roundTo(this.model.get('powerMax')),
                heatData: Utility.roundTo(this.model.get('heatCurrent')) + "/" + Utility.roundTo(this.model.get('heatPlanned')) + "/" + Utility.roundTo(this.model.get('coolingMax')),
                weightData: Utility.roundTo(this.model.get('weightCurrent')) + "/" + Utility.roundTo(this.model.get('weightPlanned')) + "/" + Utility.roundTo(this.model.get('weightMax')),
                usedUnitsData: this.model.get('usedUnitsCurrent') + "/" + this.model.get('usedUnitsPlanned'),
                unitLocationData: this.model.get('largestUnitLocation'),
                unitSizeData: this.model.get('largestUnitSize'),
                powerADData: this.model.get('powerActualDerivation')
            });
            
            if(this.model.get('rackTransparency') === '0.3')
                this.model.set('rackTransparency', '0.0');   
        },

        handleRackMouseout: function() {
            // I think i want to hide all elements when you mouse out but I am not sure yet
            this.model.set('rackTransparency', '0.3' ); 
        },
        
        onShow: function() {
            // Apparently D3 will not export a global when using requirejs
            // "D3 does not export the global d3 when AMD is detected because that kind of defeats the purpose of using a JavaScript module loader."
            // https://github.com/mbostock/d3/issues/1693
            var d3 = require('d3');

            var componentId = this.model.get('componentId');
            var rackNode = d3.select('#rack' + componentId).node();

            rackNode.addEventListener('mouseover', this.handleRackMouseover.bind(this));
            rackNode.addEventListener('mouseout', this.handleRackMouseout.bind(this));
            
        },

        _onChangeRackTransparency: function(model, rackTransparency){
            this.ui.rackMaterial.attr('transparency', rackTransparency)
        },

        _onChangeTextTransparency: function(model, textTransparency){
            this.ui.textMaterial.attr('transparency', textTransparency)
        }
    });

    return RackView;
});