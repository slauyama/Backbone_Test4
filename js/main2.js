$(function(){
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
        }
    });

    var Racks = Backbone.Collection.extend({
        model: Rack,

        load: function() {
            this.add(new Rack(1470, "50M", 42, 483, 0, 0, 4250,   3650, 0,
               1, 35000, 500, "NULL", 1,  41, 1,  0, 16,    0,   102,   0, "NULL",   0, 115
               , 1, 1500, 700));
            this.add(new Rack(1471, "50N", 42, 483, 0, 0, 4250,   2950, 0,
               1, 35000, 500, 300,   1,  35, 5,  0, 0,     0,   0,     0, 0,     0, 0,    1
               , 1500, 700));
            this.add(new Rack(1472, "50O", 42, 483, 0, 0, 4250,   2250, 0,
             1, 35000, 500, 10000, 16, 27, 15, 0, 172.8, 0,   12700, 0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1473, "50P", 42, 483, 0, 0, 4250,   1550, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1500, "50Q", 42, 483, 0, 0, 4250,   150,  1,
             1, 35000, 500, 10000, 11, 22, 10, 0, 0,     0,   0,     0, 5600,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1501, "50R", 42, 483, 0, 0, 4250,  -550,  0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1502, "50S", 42, 483, 0, 0, 4250,  -1250, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1503, "50T Tile", 42, 483, 0, 0, "NULL",  -1950, 0,
             1, 35000, 500, 10000, 1,  31, 11, 0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1504, "50U", 42, 483, 0, 0, 4250,  -2650, 0,
             1, 35000, 500, 10000, 1,  32, 10, 0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1474, "51M", 42, 483, 0, 0, 1450,   3650, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1475, "51N", 42, 483, 0, 0, 1450,   2950, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1476, "51O", 42, 483, 0, 0, 1450,   2250, 0,
             1, 35000, 500, 10000, 1,  38, 4,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1477, "51P", 42, 483, 0, 0, 1450,   1550, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1478, "51Q", 42, 483, 0, 0, 1450,   850,  0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1479, "51R", 42, 483, 0, 0, 1450,   150,  0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1480, "51S", 42, 483, 0, 0, 1450,  -550,  0,
             1, 35000, 500, 10000, 1,  38, 4,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1481, "51T", 42, 483, 0, 0, 1450,  -1250, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 86,    0,   5457,  0, 1300,  0, 1300,
              1, 1500, 700));
            this.add(new Rack(1482, "51U", 42, 483, 0, 0, 1450,  -1950, 0,
             1, 35000, 500, 10000, 1,  36, 6,  0, 136,   0,   9832,  0, 1900,  0, 1900,
              1, 1500, 700));
            this.add(new Rack(1483, "51V", 42, 483, 0, 0, 1450,  -2650, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 136,   0,   9832,  0, 1900,  0, 1900,
              1, 1500, 700));
            this.add(new Rack(1484, "51W", 42, 483, 0, 0, 1450,  -3350, 1,
             1, 35000, 500, 10000, 1,  37, 3,  0, 136,   0,   9832,  0, 1900,  0, 1900,
              1, 1500, 700));
            this.add(new Rack(1510, "51X", 42, 483, 0, 0, 1450,  -4050, 0,
             1, 35000, 500, 10000, 1,  15, 16, 0, 422,   0,   32789, 0, 5600,  0, 5600,
              1, 1500, 700));
            this.add(new Rack(1485, "52L", 42, 483, 0, 0, -1350,  4350, 0,
             1, 35000, 500, 10000, 1,  36, 2,  0, 68,    0,   9832,  0, 1900,  0, 1900,
              1, 1500, 700));
            this.add(new Rack(1486, "52M", 42, 483, 0, 0, -1350,  3650, 0,
             1, 35000, 500, 10000, 1,  36, 6,  0, 68,    0,   9832,  0, 1900,  0, 1900,
              1, 1500, 700));
            this.add(new Rack(1487, "52N", 42, 483, 0, 0, -1350,  2950, 0,
             1, 35000, 500, 10000, 1,  36, 2,  0, 68,    0,   9832,  0, 1900,  0, 1900,
              1, 1500, 700));
            this.add(new Rack(1488, "52O", 42, 483, 0, 0, -1350,  2250, 0,
             1, 35000, 500, 10000, 1,  28, 14, 0, 154,   0,   20746, 0, 4500,  0, 4500,
              1, 1500, 700));
            this.add(new Rack(1489, "52P", 42, 483, 0, 0, -1350,  1550, 0,
             1, 35000, 500, 10000, 1,  24, 14, 0, 204,   0,   29496, 0, 5700,  0, 5700,
              1, 1500, 700));
            this.add(new Rack(1490, "52Q", 42, 483, 0, 0, -1350,  "NULL",  0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1491, "52R", 42, 483, 0, 0, -1350,  150,  0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1492, "52S", 42, 483, 0, 0, -1350, -550,  0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 5700,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1493, "52T", 42, 483, 0, 0, -1350, -1250, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1511, "52U", 42, 483, 0, 0, -1350, -1950, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1512, "52V", 42, 483, 0, 0, "NULL", "NULL", 0,
             1, 35000, 500, 10000, 1,  28, 10, 0, 161,   0,   24039, 0, 4400,  0, 4400,
              1, 1500, 700));
            this.add(new Rack(1494, "52W", 42, 483, 0, 0, -1350, -3350, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1495, "52X", 42, 483, 0, 0, -1350, -4050, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1496, "53M", 42, 483, 0, 0, -4150,  3650, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1497, "53N Tile", 42, 483, 0, 0, -4150,  2950, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1498, "53O", 42, 483, 0, 0, -4150,  2250, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1499, "53P", 42, 483, 0, 0, -4150,  1550, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1505, "53Q", 42, 483, 0, 0, -4150,  150,  0,
             1, 35000, 500, 10000, 1,  32, 10, 0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1506, "53R", 42, 483, 0, 0, "NULL", -550,  0,
             1, 35000, 500, 10000, 1,  26, 16, 0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1507, "53S", 42, 483, 0, 0, -4150, -1250, 0,
             1, 35000, 500, 10000, 1,  42, 0,  0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1508, "53T", 42, 483, 0, 0, -4150, -1950, 0,
             1, 35000, 500, 10000, 1,  30, 12, 0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));
            this.add(new Rack(1509, "53U", 42, 483, 0, 0, -4150, -2650, 0,
             1, 35000, 500, 10000, 1,  32, 10, 0, 0,     0,   0,     0, 0,     0, 0,
                 1, 1500, 700));

            this._sanitizeRacks();
        },

        //  Filter out racks which do not have the right properties
        _sanitizeRacks: function(){
            var racks = this.get('racks');
            racks.reset(racks.filter(function(rack) {
                return rack.get('name').indexOf('Tile') === -1 && 
                _.isNumber(rack.get('adjustedXPosition')) &&
                _.isNumber(rack.get('adjustedYPosition')) &&
                _.isNumber(rack.get('floorPlanWidth')) &&
                _.isNumber(rack.get('floorPlanHeight'));
            })); 
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
            setBounds(data)
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

    var RackProgram = Backbone.Model.extend({

        defaults: {
            racks: new Racks()
        },

        
    });

    console.log("Models are done");

    var RackView = Backbone.View.extend({
        tagName: 'transform',

        initialize: function() {
            _.bindAll(this, 'render');
        },

        getColor: function(colorValue) {
            var badDataFlag = false, value;
            
            switch (colorValue) {
                case "Power":
                    value = this.model.powerCurrent / this.model.powerMax;
                    if (!_.isNumber(value))
                        badDataFlag = true;
                    break;
                case "Weight":
                    value = this.model.weightCurrent / this.model.weightMax;
                    if (!_.isNumber(value))
                        badDataFlag = true;
                    break;
                case "Temperature":
                    value = this.model.heatCurrent / this.model.coolingMax;
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

        render: function(){
            this.el.translation = "3.5 3.3 0";

            var shape = "<shape id='this.model.componentId' class='rack'>";
            var appearance = "<appearance sorttype='auto'>";
            var material = "<material ambientintensity='0.2'" + 
                " diffusecolor=" + this.getColor() + " shininess='0.2'>";
            var closeAppearance = "</material></appearance>";
            var box = "<box size='"+ this.model.floorPlanWidth + ' ' +
                (this.model.floorPlanHeight - 0.1) + ' ' + 
                this.model.height + "'></box>";
            var closeTransform = "</shape></transform>";

            $(this.el).html(shape + appearance + material + closeAppearance 
                + box + closeTransform);
            return this;
        }
    });

    var RacksView = Backbone.View.extend({
        //itemview is marionette
        model: RackView,

        initialize: function() {
            var rackProgram = new RackProgram();
            console.log(rackProgram);
        }

    });

    var AppView = Backbone.View.extend({
        el: $('#x3dElement')
    });


    
    
});

//NOTES FOR BACKBONE MVC

// MODELS I am planning to use - Do I need models for the same data. can i just represent it with a different view.
// Rack / Racks (Collection)
// Rack Floor has the floor of stage
// Rack Stage - contains the floor and rack maybe views
// Rack Leader (top three values of a given property) -> Rack Leader Board (Collections of different leaders)
// Rack Color options

// VIEWS 
// RackView / RacksView
// RackFloorView
// RackAppView
// Additional UI controls (display grid and shuffle view)


//view - properties
// el is the element.
// ui is marionette
    // ui allows for binding variables to elements. faster than searching them up all the time


    componentId
    name
    height
    width
    depth
    rackOrientation
    adjustedXPosition
    adjustedYPosition
    numberingOrigin 
    overlappingAllowed 
    coolingMax 
    weightMax 
    powerMax 
    largestUnitLocation 
    largestUnitSize 
    usedUnitsCurrent 
    usedUnitsPlanned 
    weightCurrent 
    weightPlanned 
    heatCurrent 
    heatPlanned 
    powerCurrent 
    powerPlanned 
    powerActual 
    powerActualDerivation 
    floorPlanWidth
    floorPlanHeight