// RackStage requires a racks view and will also require a rackFloorView
// Want to convert this view into a layout view

define([
    'models/rackFloor',
    // 'templates/rackStageLayoutView'
    'views/racksView',
], function(RackFloor, RacksView) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        template: _.template(''),

        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene',
        },

        initialize: function(collection){
			var rackFloor = new RackFloor(collection.models);
            
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection,
                rackFloor: rackFloor
            });

			// Attach's the rendered racksView to the #x3dScene
            // I would like something like this in the future racksView.render();
            $(this.ui.scene).append(racksView.render().el);
           
           // Not sure what this does.
            // I think it triggers the show method and its event
            // I am not sure what the show method does or if it is needed
            racksView.triggerMethod('show');

            
        }
        
    });

    return RackStageView;
});
