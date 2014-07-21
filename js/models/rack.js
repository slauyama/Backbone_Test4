define([
    "utility"
], function(Utility) {
    "use strict";

    var Rack = Backbone.Model.extend({
        defaults: {
            componentId: 0,
            name: "",
            //convert and adjust the rack height into proper units 
            //I dont remember the converted units ask PF 
            height: 0,
            width: 0,
            depth: 0,
            rackOrientation: 0,
            //adjust x position to move it from the center to the left edge 
            adjustedXPosition: 0,
            //adjust y position to move it from the center to the top edge 
            adjustedYPosition: 0,
            numberingOrigin: -1,
            overlappingAllowed: -1,
            coolingMax: -1, 
            weightMax: -1,
            powerMax: -1,
            largestUnitLocation: -1,
            largestUnitSize: -1,
            usedUnitsCurrent: -1,
            usedUnitsPlanned: -1,
            weightCurrent: -1,
            weightPlanned: -1,
            //heat is calculate based off of power. watss to BTU's 
            heatCurrent: -1,
            heatPlanned: -1,
            powerCurrent: -1,
            powerPlanned: -1,
            powerActual: -1,
            powerActualDerivation: -1,
            //adjust the floorplan by a scale of 1000 
            //this is matched with the height 
            floorPlanWidth: 0,
            floorPlanHeight: 0,

            // Set it to -1 before initialized will change it in adjustingDefaults
            transparency: -1
        },

        // This will adjust the properties to proper scale
        adjustDefaults: function() {
            this.set('height', this.get('height') * 44.5 / 1000);
            this.set('adjustedXPosition', (this.get('adjustedXPosition') - this.get('floorPlanWidth') / 2) / 1000);
            this.set('adjustedYPosition', (this.get('adjustedYPosition') - this.get('floorPlanHeight') / 2) / 1000);
            this.set('heatCurrent', Utility.roundTo(this.get('powerCurrent') * 3.412141633, 2));
            this.set('heatPlanned', Utility.roundTo(this.get('powerPlanned') * 3.412141633, 2));
            this.set('floorPlanWidth', this.get('floorPlanWidth') / 1000);
            this.set('floorPlanHeight', this.get('floorPlanHeight') / 1000);
            this.set('transparency', '0.3');
        },

        initialize: function(){
            this.adjustDefaults();
        }

    });

    return Rack;
});