define(['models/racks', 'views/racksView'],
    function(Racks, RacksView) {
        "use strict";

        var RackProgram = Backbone.Model.extend({
            initialize: function(){
                console.log("initializing RackProgram")

                var racks = new Racks();
                var racksView = new RacksView({
                    collection: racks
                });
                $('#x3dElement').append(racksView.render().el);
                racksView.triggerMethod('show');
            }
        });

        return RackProgram;
    }
);