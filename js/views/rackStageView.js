// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView'
], function(RacksView) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene',
            viewOptions: '#rack-view-options',
            cameraOptions: '.camera-option',
            colorOptions: '.color-option'
        },

        initialize: function(collection){
				
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection
            });

			// Attach's the rendered racksView to the #x3dScene
            $(this.ui.scene).append(racksView.render().el);
            // Not sure what this does.
            // I think it triggers the show method and its event
            racksView.triggerMethod('show');

            //Creating Buttons for the camera views
            $(this.ui.cameraOptions).append(this.createButton("Top View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Front View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Left View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Right View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Back View", "button"));
            $(this.ui.cameraOptions).append(this.createButton("Perspective", "button"));

            $(this.ui.colorOptions).append(this.createButton("Power", "button"));
            $(this.ui.colorOptions).append(this.createButton("Weight", "button"));
            $(this.ui.colorOptions).append(this.createButton("Temperature", "button"));
        },

        createButton: function(title, classNames) {
            return "<input type='button' value='" + title + "' class='" + classNames +"'>";
        }
    });

    return RackStageView;
});