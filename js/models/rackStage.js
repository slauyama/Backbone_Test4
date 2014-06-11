define([
    'views/racksView'
], function(RacksView) {
    "use strict";

    var RackStage = Backbone.View.extend({
        initialize: function(collection){
            var racksView = new RacksView({
                collection: collection
            });

            $('#x3dScene').append(racksView.render().el);
            racksView.triggerMethod('show');
        }
    });

    return RackStage;
});