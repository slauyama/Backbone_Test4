// RackStage requires a racks view and will also require a rackFloorView
// I might want to change how the buttons by making them with a template
// Not sure if making a button is too small for a view


define([
    "text!templates/rackOptionsTemplate.html"
], function(RackOptionsTemplate) {
    "use strict";

    var RackOptionsView = Backbone.Marionette.ItemView.extend({
        template: _.template(RackOptionsTemplate),
        templateHelpers: {
            viewButtons: [
                {
                    title:"Top View", className: "viewButton"
                },
                {
                    title:"Front View", className: "viewButton"
                },
                {
                    title:"Left View", className: "viewButton"
                },
                {
                    title:"Right View", className: "viewButton"
                },
                {
                    title:"Back View", className: "viewButton"
                },
                {
                    title: "Perspective", className: "viewButton"
                }
            ],
            
            colorButtons: [
                {
                    title:"Power", className: "colorButton"
                },
                {
                    title:"Weight", className: "colorButton"
                },
                {
                    title:"Temperature", className: "colorButton"
                }
            ],

            checkboxes: [
                {
                    title:"Display Grid", value:"grid-toggle", property: "checked"
                },
                {
                    title:"Shuffle Views", value:"view-shuffle"
                },
                {
                    title:"Display Names", value:"names-toggle"
                }
            ]
        },

        ui: {
            cameraOptions: '.camera-option',
            colorOptions: '.color-option',
            formGroup: '.form-group',
            // gridMaterial: '#grid-material'
        },

        events: {
            'mouseover .camera-option .button': 'toggleCamera',
            'mouseover .color-option .button': 'toggleColor',
            'click #grid-toggle' : 'toggleGridTransparency',
            'click #view-shuffle' : 'shuffleView',
            'click #names-toggle' : 'toggleNames'
        },

        // Marionette's onRender was not working for me
        onRender: function() {
            // Select the first element in each category
            $(this.ui.cameraOptions).children()[0].className += " selected-view";
            $(this.ui.colorOptions).children()[0].className += " selected-color";
            
            // Call the first view in the list of views
            try {
                document.getElementById($(this.ui.cameraOptions).children()[0].value).setAttribute('set_bind', 'true');
            } catch(exception) {
                return "Cannot call the first view";
            }

            $('h3[title!=""]').qtip();
        },

        shuffleView: function(event) {
            console.log("shuffleView", event);


        },

        toggleNames: function() {
            _.each($('.rack-text'), function(material) {
                material.setAttribute("transparency", material.transparency === "0" ? "1.0" : "0");
            });   
        },

        toggleGridTransparency: function() {
            // Can't use a ui element because the grid is not loaded yet
            var material = $('#grid-material')[0];   
            material.setAttribute("transparency", material.transparency === "1.0" ? ".65" : "1.0");    
        },

        toggleCamera: _.throttle(function(event) {
            if (event.currentTarget.className.lastIndexOf("selected-view") === -1) {
                // Should not be using event.currentTarget but will figure that out later
                $('.selected-view').removeClass('selected-view');
                event.currentTarget.className += " selected-view";

                /* To activate a viewpoint you set "set_bind" to true */
                try {
                    document.getElementById(event.currentTarget.value).setAttribute('set_bind', 'true');
                } catch(exception) {
                    console.log("Cannot find " + event.currentTarget.value + " '" + exception + "'")
                }
            }
            
        }, 1500),

        toggleColor: function(event) {
            if (event.currentTarget.className.lastIndexOf("selected-color") === -1) {
                console.log("just checking");
                $('.selected-color').removeClass('selected-color');
                event.currentTarget.className += " selected-color";
                this.trigger('changingColor')
            }
        }
    });

    return RackOptionsView;
});