$(function(){
    "use strict";

    Math.roundTo = function(num, amount){
        if (amount == null)
            amount = 0;
        return Math.round(num * Math.pow(10,amount)) / Math.pow(10,amount)
    }

    console.logDate = function(){
        if (arguments.length)
            timestamp = '[' + new Date().toUTCString() + '] '
        console.log(timestamp, arguments)
    }

    var isNumber = function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

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

        adjustProperties: function() {
            console.log("adjusting");
            this.height = this.height * 44.5 / 1000;
            this.adjustedXPosition = (this.adjustedXPosition - this.floorPlanWidth / 2) / 1000;
            this.adjustedYPosition = (this.adjustedYPosition - this.floorPlanHeight / 2) / 1000;
            this.heatCurrent = this.powerCurrent * 3.412141633;
            this.heatPlanned = this.powerPlanned * 3.412141633;
            this.floorPlanWidth = this.floorPlanWidth / 1000;
            this.floorPlanHeight = this.floorPlanHeight / 1000;

        }
    });

    var Racks = Backbone.Collection.extend({
        model: Rack,
        
        //  TODO: Ideally just call this.reset w/ server-side array of JSON objects.
        load: function(){
            console.log("Loading data into variable racks")
            this.add({
                componentId:1470,
                name:"50M",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:3650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:300,
                largestUnitLocation:1,
                largestUnitSize:41,
                usedUnitsCurrent:1,
                usedUnitsPlanned:0,
                weightCurrent:16,
                weightPlanned:0,
                heatCurrent:102,
                heatPlanned:0,
                powerCurrent:115,
                powerPlanned:0,
                powerActual:115,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1471,
                name:"50N",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:2950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:300,
                largestUnitLocation:1,
                largestUnitSize:35,
                usedUnitsCurrent:5,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1472,
                name:"50O",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:2250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:16,
                largestUnitSize:27,
                usedUnitsCurrent:15,
                usedUnitsPlanned:0,
                weightCurrent:172.8,
                weightPlanned:0,
                heatCurrent:12700,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1473,
                name:"50P",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:1550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1500,
                name:"50Q",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:150,
                numberingOrigin:1,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:11,
                largestUnitSize:22,
                usedUnitsCurrent:10,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1501,
                name:"50R",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:-550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1502,
                name:"50S",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:-1250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1503,
                name:"50T",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:-1950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:31,
                usedUnitsCurrent:11,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1504,
                name:"50U",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:4250,
                adjustedYPosition:-2650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:32,
                usedUnitsCurrent:10,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1474,
                name:"51M",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:3650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1475,
                name:"51N",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:2950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1476,
                name:"51O",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:2250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:38,
                usedUnitsCurrent:4,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1477,
                name:"51P",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:1550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1478,
                name:"51Q",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:850,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1479,
                name:"51R",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:150,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1480,
                name:"51S",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:-550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:38,
                usedUnitsCurrent:4,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1481,
                name:"51T",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:-1250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:86,
                weightPlanned:0,
                heatCurrent:5457,
                heatPlanned:0,
                powerCurrent:1300,
                powerPlanned:0,
                powerActual:1300,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1482,
                name:"51U",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:-1950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:36,
                usedUnitsCurrent:6,
                usedUnitsPlanned:0,
                weightCurrent:136,
                weightPlanned:0,
                heatCurrent:9832,
                heatPlanned:0,
                powerCurrent:1900,
                powerPlanned:0,
                powerActual:1900,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1483,
                name:"51V",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:-2650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:136,
                weightPlanned:0,
                heatCurrent:9832,
                heatPlanned:0,
                powerCurrent:1900,
                powerPlanned:0,
                powerActual:1900,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1484,
                name:"51W",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:-3350,
                numberingOrigin:1,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:37,
                usedUnitsCurrent:3,
                usedUnitsPlanned:0,
                weightCurrent:136,
                weightPlanned:0,
                heatCurrent:9832,
                heatPlanned:0,
                powerCurrent:1900,
                powerPlanned:0,
                powerActual:1900,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1510,
                name:"51X",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:1450,
                adjustedYPosition:-4050,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:15,
                usedUnitsCurrent:16,
                usedUnitsPlanned:0,
                weightCurrent:422,
                weightPlanned:0,
                heatCurrent:32789,
                heatPlanned:0,
                powerCurrent:5600,
                powerPlanned:0,
                powerActual:5600,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1485,
                name:"52L",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:4350,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:36,
                usedUnitsCurrent:2,
                usedUnitsPlanned:0,
                weightCurrent:68,
                weightPlanned:0,
                heatCurrent:9832,
                heatPlanned:0,
                powerCurrent:1900,
                powerPlanned:0,
                powerActual:1900,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1486,
                name:"52M",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:3650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:36,
                usedUnitsCurrent:6,
                usedUnitsPlanned:0,
                weightCurrent:68,
                weightPlanned:0,
                heatCurrent:9832,
                heatPlanned:0,
                powerCurrent:1900,
                powerPlanned:0,
                powerActual:1900,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1487,
                name:"52N",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:2950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:36,
                usedUnitsCurrent:2,
                usedUnitsPlanned:0,
                weightCurrent:68,
                weightPlanned:0,
                heatCurrent:9832,
                heatPlanned:0,
                powerCurrent:1900,
                powerPlanned:0,
                powerActual:1900,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1488,
                name:"52O",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:2250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:28,
                usedUnitsCurrent:14,
                usedUnitsPlanned:0,
                weightCurrent:154,
                weightPlanned:0,
                heatCurrent:20746,
                heatPlanned:0,
                powerCurrent:4500,
                powerPlanned:0,
                powerActual:4500,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1489,
                name:"52P",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:1550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:24,
                usedUnitsCurrent:14,
                usedUnitsPlanned:0,
                weightCurrent:204,
                weightPlanned:0,
                heatCurrent:29496,
                heatPlanned:0,
                powerCurrent:5700,
                powerPlanned:0,
                powerActual:5700,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1490,
                name:"52Q",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:850,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1491,
                name:"52R",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:150,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1492,
                name:"52S",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:-550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1493,
                name:"52T",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:-1250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1511,
                name:"52U",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:-1950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1512,
                name:"52V",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:-2650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:28,
                usedUnitsCurrent:10,
                usedUnitsPlanned:0,
                weightCurrent:161,
                weightPlanned:0,
                heatCurrent:24039,
                heatPlanned:0,
                powerCurrent:4400,
                powerPlanned:0,
                powerActual:4400,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1494,
                name:"52W",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:-3350,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1495,
                name:"52X",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-1350,
                adjustedYPosition:-4050,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1496,
                name:"53M",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:3650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1497,
                name:"53N",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:2950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1498,
                name:"53O",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:2250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1499,
                name:"53P",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:1550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1505,
                name:"53Q",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:150,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:32,
                usedUnitsCurrent:10,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1506,
                name:"53R",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:-550,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:26,
                usedUnitsCurrent:16,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1507,
                name:"53S",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:-1250,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:42,
                usedUnitsCurrent:0,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1508,
                name:"53T",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:-1950,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:30,
                usedUnitsCurrent:12,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
            this.add({
                componentId:1509,
                name:"53U",
                height:42,
                width:483,
                depth:0,
                rackOrientation:0,
                adjustedXPosition:-4150,
                adjustedYPosition:-2650,
                numberingOrigin:0,
                overlappingAllowed:1,
                coolingMax:35000,
                weightMax:500,
                powerMax:10000,
                largestUnitLocation:1,
                largestUnitSize:32,
                usedUnitsCurrent:10,
                usedUnitsPlanned:0,
                weightCurrent:0,
                weightPlanned:0,
                heatCurrent:0,
                heatPlanned:0,
                powerCurrent:0,
                powerPlanned:0,
                powerActual:0,
                powerActualDerivation:1,
                floorPlanWidth:1500,
                floorPlanHeight:700
            });
        
            //  Probably good to call sanitize here since new racks have been added.
            this.sanitize();
        },

        //  Filter out racks which do not have the right properties
        sanitize: function(){
            this.reset(this.filter(function(rack) {
                return rack.get('name').indexOf('Tile') === -1 && 
                isNumber(rack.get('adjustedXPosition')) &&
                isNumber(rack.get('adjustedYPosition')) &&
                isNumber(rack.get('floorPlanWidth')) &&
                isNumber(rack.get('floorPlanHeight'));
            })); 
        }
    });

    var RackProgram = Backbone.Model.extend({

        // defaults: {
        //     racks: new Racks()
        // },

        initialize: function(){
            console.log("initializing RackProgram")
            console.log(this);
            this.racks = new Racks();
            this.racks.load();
            var racksView = new RacksView({collection: this.racks})
            $('#x3dElement').append(racksView.render().el);
            racksView.triggerMethod('show');
        }
    });

    var RackFloor = Backbone.Model.extend({
        defaults: {
            // initialize the values to extremes to find actual value  //
            // not sure i need this anymore if I am getting values from data //
            // will relook at this later //
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

        // Recalculate the bounds based on the data //
        // Was used if i want to change plans. Need to relook at the scale. //
        setBounds: function(data) {
            // Will find the min and max values for x and y position //
            this.boundingBox.minX = Math.roundTo(d3.min(data, function(data) {
                return data.adjustedXPosition;
            }), 2);
              
            this.boundingBox.maxX = Math.roundTo(d3.max(data, function(data) {
                return data.adjustedXPosition;
            }), 2);

            this.boundingBox.minY = Math.roundTo(d3.min(data, function(data) {
                return data.adjustedYPosition;
            }), 2);

            this.boundingBox.maxY = Math.roundTo(d3.max(data, function(data) {
                return data.adjustedYPosition;
            }), 2);
            
            // Will find the max width and height
            this.maxWidth = Math.roundTo(d3.max(data, function(data) {
                return data.floorPlanWidth;
            }), 2)
            
            this.maxHeight = Math.roundTo(d3.max(data, function(data) {
                return data.floorPlanHeight;
            }), 2)
        },
    });

    console.log("Models are done");

    var RackView = Backbone.Marionette.ItemView.extend({
        model: Rack,

        tagName: 'transform',

        initialize: function() {
            _.bindAll(this, 'render');
        },

        getColor: function(colorValue) {
            var badDataFlag = false, value;
            
            switch (colorValue) {
                case "Power":
                    value = this.model.get('powerCurrent') / this.model.get('powerMax');
                    if (!isNumber(value))
                        badDataFlag = true;
                    break;
                case "Weight":
                    value = this.model.get('weightCurrent') / this.model.get('weightMax');
                    if (!isNumber(value))
                        badDataFlag = true;
                    break;
                case "Temperature":
                    value = this.model.get('heatCurrent') / this.model.get('coolingMax');
                    if (!isNumber(value))
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

        render: function(){
            this.el.translation = "3.5 3.3 0";
            this.model.adjustProperties();
            console.log(this.model);

            var shape = "<shape id='" + this.model.get('componentId') + "' class='rack'>";
            var appearance = "<appearance sorttype='auto'>";
            var material = "<material ambientintensity='0.2'" + 
                " diffusecolor=" + this.getColor() + " shininess='0.2'>";
            var closeAppearance = "</material></appearance>";
            var box = "<box size='"+ this.model.get('floorPlanWidth') + ' ' +
                (this.model.get('floorPlanHeight') - 0.1) + ' ' + 
                this.model.get('height') + "'></box>";
            var closeTransform = "</shape></transform>";

            var testString = shape + appearance + material + closeAppearance 
                + box + closeTransform;
            console.log(testString);
            this.$el.html(testString);

            return this;
        }
    });

    var RacksView = Backbone.Marionette.CollectionView.extend({
        tagName: 'scene',
        id: 'x3dScene',

        //itemview is marionette
        itemView: RackView,

        initialize: function() {

        },

        // Becuase I am using Marionette
        // Whenever I pass in a collection to the RackView
        // It will automiatically render
        // render: function() {
        onBeforeRender: function() {
            
        },
        onRender: function() {
               
        }

    });

    var rackProgram = new RackProgram();

    var AppView = Backbone.View.extend({
        el: $('#x3dElement')
    });


    
    
});
 
//NOTES FOR BACKBONE MVC
//view - properties
    // el is the element.
    // ui is marionette
    // ui allows for binding variables to elements. faster than searching them up all the time