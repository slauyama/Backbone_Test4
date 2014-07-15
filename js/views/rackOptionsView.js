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
                }
            ]
        },

        ui: {
            cameraOptions: '.camera-option',
            colorOptions: '.color-option',
            formGroup: '.form-group',
            gridMaterial: '#grid-material'
        },

        events: {
            'click #view-shuffle' : 'shuffleView',
            'click #grid-toggle' : 'toggleGridTransparency',
            'mouseover .camera-option .button': 'toggleCamera',
            'mouseover .color-option .button': 'toggleColor',
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
        },

        shuffleView: function(event) {
            console.log("shuffleView", event);


        },

        toggleGridTransparency: function() {
            if ($(this.ui.gridMaterial)[0].transparency === "1.0") {
                $(this.ui.gridMaterial)[0].setAttribute("transparency", ".65");
            } else {
                $(this.ui.gridMaterial)[0].setAttribute("transparency", "1.0");
            }
        },

        toggleCamera: _.throttle(function(event) {
            // Should not be using event.currentTarget but will figure that out later
            $('.selected-view').removeClass('selected-view');
            event.currentTarget.className += " selected-view";

            /* To activate a viewpoint you set "set_bind" to true */
            try {
                document.getElementById(event.currentTarget.value).setAttribute('set_bind', 'true');
            } catch(exception) {
                console.log("Cannot find " + event.currentTarget.value + " '" + exception + "'")
            }
            
        }, 1500),

        toggleColor: function(event) {
            $('.selected-color').removeClass('selected-color');
            event.currentTarget.className += " selected-color";
            this.trigger('changingColor')
        }
    });

    return RackOptionsView;
});