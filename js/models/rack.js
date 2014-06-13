define(function() {
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
            floorPlanHeight: 0
        },

        initialize: function(){
            this.adjustProperties();
        },

        // This will adjust the properties to proper scale
        adjustProperties: function() {
            this.set('height', this.get('height') * 44.5 / 1000);
            this.set('adjustedXPosition', (this.get('adjustedXPosition') - this.get('floorPlanWidth') / 2) / 1000);
            this.set('adjustedYPosition', (this.get('adjustedYPosition') - this.get('floorPlanHeight') / 2) / 1000);
            this.set('heatCurrent', this.get('powerCurrent') * 3.412141633);
            this.set('heatPlanned', this.get('powerPlanned') * 3.412141633);
            this.set('floorPlanWidth', this.get('floorPlanWidth') / 1000);
            this.set('floorPlanHeight', this.get('floorPlanHeight') / 1000);
        }
    });

    return Rack;
});