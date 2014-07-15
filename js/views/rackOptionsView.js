// RackStage requires a racks view and will also require a rackFloorView
// I might want to change how the buttons by making them with a template
// Not sure if making a button is too small for a view


define([
    "text!templates/rackOptionButton.html",
    "text!templates/rackOptionCheckbox.html",
    "text!templates/rackOptionsTemplate.html"
], function(RackOptionButton, RackOptionCheckbox, RackOptionsTemplate) {
    "use strict";

    var RackOptionsView = Backbone.Marionette.Layout.extend({
        template: _.template(RackOptionsTemplate),

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

        render: function() {
            console.log("Rendering Now");
            var that = this;
            // Not sure if this is correct or if this should be done in this view

            // Creating Buttons for the camera views
            this.allViewButtons = ["Top View", "Front View", "Left View", "Right View", "Back View", "Perspective"];

            this.allViewButtons.forEach(function(viewButton) {
                $(this.ui.cameraOptions).append(this.createButton(viewButton, "viewButton"));
            }.bind(this));
            
            // Creating Buttons for the color options
            this.allColorButtons = ["Power", "Weight", "Temperature"];

            this.allColorButtons.forEach(function(colorButton) {
                $(this.ui.colorOptions).append(this.createButton(colorButton, "colorButton"));
            }.bind(this));

            // Creating two check boxes
            $(this.ui.formGroup).append(this.createCheckBox("Display Grid", "grid-toggle", "checked"));
            $(this.ui.formGroup).append(this.createCheckBox("Shuffle Views", "view-shuffle"));
            this.afterRender();
        },

        // Marionette's onRender was not working for me
        afterRender: function() {
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

        createButton: function(title, className) {
            return _.template(RackOptionButton, {
                title: title,
                className: className
            });
        },

        createCheckBox: function(title, value, property) {
            return _.template(RackOptionCheckbox, {
                title: title,
                value: value,
                property: property
            });
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
                console.log("Cannot find event.currentTarget.value '" + exception + "'")
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