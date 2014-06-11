define([
    'collections/racks',
    'views/racksView'
], function(Racks, RacksView) {
    "use strict";

    var RackStage = Backbone.Model.extend({
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