// RackStage requires a racks view and will also require a rackFloorView

define([
    'views/racksView'
], function(RacksView) {
    "use strict";

<<<<<<< HEAD:js/views/rackStageView.js
    // 
    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene'
        },

=======
    //  CODE REVIEW SA - RackStage is in your /models folder but it's clearly a view. Move it.
    var RackStage = Backbone.View.extend({
        // RackStage will be passed a collection from the rackProgram
>>>>>>> origin/templating:js/models/rackStage.js
        initialize: function(collection){
		
		
            //Create a new racksView and pass it the collection
            var racksView = new RacksView({
                collection: collection
            });

			//  CODE REVIEW SA - Use .ui instead of a jQuery selector here.
            // Will attach the rendered racksView to the #x3dScene
            this.ui.scene.append(racksView.render().el);
            racksView.triggerMethod('show');
        }
    });

    return RackStageView;
});