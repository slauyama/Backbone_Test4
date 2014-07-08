// RackStage requires a racks view and will also require a rackFloorView

define([
    
], function() {
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
            'click #view-shuffle' : 'helloSimon',
            'click #grid-toggle' : 'toggleGridTransparency',
            'mouseover .camera-option .button': 'toggleCamera',
            'mouseover .color-option .button': 'helloSimon',
        },

        initialize: function(collection){
            this.render();
        },

        render: function() {
            // Not sure if this is correct or if this should be done in this view

            // Creating Buttons for the camera views
            $(this.ui.cameraOptions).append(this.createButton("Top View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Front View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Left View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Right View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Back View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Perspective", "button"));

            // Creating Buttons for the color options
            $(this.ui.colorOptions).append(this.createButton("Power", "button"));
            $(this.ui.colorOptions).append(this.createButton("Weight", "button"));
            $(this.ui.colorOptions).append(this.createButton("Temperature", "button"));

            // Creating two check boxes
            $(this.ui.formGroup).append(this.createCheckBox("Display Grid", "grid-toggle"));
            $(this.ui.formGroup).append(this.createCheckBox("Shuffle Views", "view-shuffle"));

        },

        createButton: function(title, classNames) {
            return "<input type='button' value='" + title + "' class='" + classNames +"'>";
        },

        createCheckBox: function(title, value) {
            var label = "<label for='" + value + "'>" + title + ":</label>";
            var checkbox = "<input type='checkbox' value='" + value + "' id='" + value + "' class='checkbox'>";
            return label + checkbox;
        },

        helloSimon: function() {
            console.log('helloSimon');
        },

        toggleGridTransparency: function() {
          if ($(this.ui.gridMaterial).transparency === "1.0") {
            $(this.ui.gridMaterial).transparency = ".65";
          } else {
            $(this.ui.gridMaterial).transparency = "1.0";
          }
        },

        toggleCamera: function(event, context) {
            console.log(event, context);
            // clearAllSelected('selected-view');
            // this.className += " selected-view";

            /* To activate a viewpoint you set "set_bind" to true */
            // document.getElementById(this.value).setAttribute('set_bind', 'true');
        },

        toggleColor: function() {
            $('.selected-color').removeClass('selected-color');
        }
    });

    return RackOptionsView;
});