// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView'
], function(RacksView) {
    "use strict";

    //  CODE REVIEW SA - RackStage is in your /models folder but it's clearly a view. Move it.
    var RackStage = Backbone.View.extend({
        // RackStage will be passed a collection from the rackProgram
        initialize: function(collection){
		
		
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection
            });

			//  CODE REVIEW SA - Use .ui instead of a jQuery selector here.
            // Will attach the rendered racksView to the #x3dScene
            $('#x3dScene').append(racksView.render().el);
            racksView.triggerMethod('show');
        }
    });

    return RackStage;
});