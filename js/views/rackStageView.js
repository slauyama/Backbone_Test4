// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView'
], function(RacksView) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene'
        },

        initialize: function(collection){
				
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection
            });

			//  CODE REVIEW SA - Use .ui instead of a jQuery selector here.
            // Will attach the rendered racksView to the #x3dScene

            $(this.ui.scene).append(racksView.render().el);
            racksView.triggerMethod('show');
        }
    });

    return RackStageView;
});