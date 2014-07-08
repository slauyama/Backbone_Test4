// RackStage requires a racks view and will also require a rackFloorView

define([
    
], function() {
    "use strict";

    var RackOptionsView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        el: $('#rack-view-options'),

        ui: {
            viewOptions: '#rack-view-options',
            cameraOptions: '.camera-option',
            colorOptions: '.color-option',
            formGroup: '.form-group'
        },

        events: {
            'click #view-shuffle' : 'helloSimon',
            'mouseover this.ui.cameraOptions > .button': 'helloSimon'
        },

        initialize: function(collection){
            this.render();
        },

        render: function() {
            // Not sure if this is correct or if this should be done in this view

            //Creating Buttons for the camera views
            $(this.ui.cameraOptions).append(this.createButton("Top View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Front View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Left View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Right View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Back View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Perspective", "button"));

            //Creating Buttons for the color options
            $(this.ui.colorOptions).append(this.createButton("Power", "button"));
            $(this.ui.colorOptions).append(this.createButton("Weight", "button"));
            $(this.ui.colorOptions).append(this.createButton("Temperature", "button"));

            //Creating two check boxes
            $(this.ui.formGroup).append(this.createCheckBox("Display Grid", "grid-toggle"));
            $(this.ui.formGroup).append(this.createCheckBox("Shuffle Views", "view-shuffle"));
        },

        createButton: function(title, classNames) {
            return "<input type='button' value='" + title + "' class='" + classNames +"'>";
        },

        createCheckBox: function(title, id) {
            var label = "<label for='" + id + "'>" + title + ":</label>";
            var checkbox = "<input type='checkbox' value='" + id + "' class='checkbox'>";
            return label + checkbox;
        },

        helloSimon: function() {
            console.log('helloSimon');
        }
    });

    return RackOptionsView;
});