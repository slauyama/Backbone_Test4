// RackStage requires a racks view and will also require a rackFloorView
// I might want to change how the buttons by making them with a template
// Not sure if making a button is too small for a view


define([
    "text!templates/rackOptionButton.html",
    "text!templates/rackOptionCheckbox.html"
], function(RackOptionButton, RackOptionCheckbox) {
    "use strict";

    var RackOptionsView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        el: $('#rack-view-options'),

        ui: {
            cameraOptions: '.camera-option',
            colorOptions: '.color-option',
            formGroup: '.form-group',
            gridMaterial: '#grid-material'
        },


        events: {
            'click #view-shuffle' : 'shuffleView',
            'click #grid-toggle' : 'toggleGridTransparency',
            'mouseover .camera-option .button': 'throttledToggleCamera',
            'mouseover .color-option .button': 'toggleColor',
        },

        initialize: function(collection){
            this.render();

            // Select the first element in each category
            $(this.ui.cameraOptions).children()[0].className += " selected-view";
            $(this.ui.colorOptions).children()[0].className += " selected-color";
            console.log("just gave the first element the selected class ")
            // Call the first view in the list of views
            try {
                document.getElementById($(this.ui.cameraOptions).children()[0].value).setAttribute('set_bind', 'true');
            } catch(exception) {
                return "Cannot call the first view";
            }
        },

        render: function() {
            var that = this;
            // Not sure if this is correct or if this should be done in this view

            // Creating Buttons for the camera views
            this.allViewButtons = ["Top View", "Front View", "Left View", "Right View", "Back View", "Perspective"];

            this.allViewButtons.forEach(function(viewButton) {
                $(that.ui.cameraOptions).append(that.createButton(viewButton));
            });
            
            // Creating Buttons for the color options
            this.allColorButtons = ["Power", "Weight", "Temperature"];

            this.allColorButtons.forEach(function(colorButton) {
                $(that.ui.colorOptions).append(that.createButton(colorButton));
            });

            // Creating two check boxes
            $(this.ui.formGroup).append(this.createCheckBox("Display Grid", "grid-toggle", "checked"));
            $(this.ui.formGroup).append(this.createCheckBox("Shuffle Views", "view-shuffle"));

        },

        createButton: function(title) {
            return _.template(RackOptionButton, {
                title: title
            });
        },

        createCheckBox: function(title, value, property) {
            return _.template(RackOptionCheckbox, {
                title: title,
                value: value,
                property: property
            });
        },

        shuffleView: function() {

        },

        toggleGridTransparency: function() {
            console.log("Toggling Grid toggleGridTransparency");
            if ($(this.ui.gridMaterial)[0].transparency === "1.0") {
                $(this.ui.gridMaterial)[0].setAttribute("transparency", ".65");
            } else {
                $(this.ui.gridMaterial)[0].setAttribute("transparency", "1.0");
            }
        },

        toggleCamera: function(event) {
            // Should not be using event.currentTarget but will figure that out later
            $('.selected-view').removeClass('selected-view');
            event.currentTarget.className += " selected-view";

            /* To activate a viewpoint you set "set_bind" to true */
            try {
                document.getElementById(event.currentTarget.value).setAttribute('set_bind', 'true');
            } catch(exception) {
                console.log("Cannot find event.currentTarget.value '" + exception + "'")
            }
            
        },

        throttledToggleCamera: function(event) {
            this.throttledToggleCamera = _.throttle(this.toggleCamera, 10000);
        },

        callThrottleToggleCamera: function(event) {
            console.log("throttledToggleCamera",throttledToggleCamera);
            this.throttledToggleCamera(event);
        },

        toggleColor: function(event) {
            $('.selected-color').removeClass('selected-color');
            event.currentTarget.className += " selected-color";
            this.trigger('changingColor')
        }
    });

    return RackOptionsView;
});