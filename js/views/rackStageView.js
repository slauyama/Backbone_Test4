// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView',
    'views/rackOptionsView'
], function(RacksView, RackOptionsView) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene',
            rackOptions: '#rack-view-options',
        },

        events: {
            // 'click this.ui.formGroup > input' : 'helloSimon',
            // 'mouseover this.ui.cameraOptions > .button': 'helloSimon',
            'click' : 'helloSimon',
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

            var rackOptionsView = new RackOptionsView();
            // $(this.ui.rackOptions).append(rackOptionsView.render().el);
        }
    });

    return RackStageView;
});