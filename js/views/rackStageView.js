// RackStage requires a racks view and will also require a rackFloorView

define([
    'models/rackGrid',
    'models/rackFloor',
    'views/racksView',
    'views/rackOptionsView',
], function(RackGrid, RackFloor, RacksView, RackOptionsView) {
    "use strict";

    var RackStageView = Backbone.View.extend({
        // RackStageView will be passed a collection from the rackProgram
        ui: {
            scene: '#x3dScene',
            rackOptions: '#rack-view-options',
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

            var rackOptionsView = new RackOptionsView();
            this.listenTo(rackOptionsView, 'changingColor', function() {
                console.log("I listened to the ChangeColor Event")
                racksView.render();
            });

            this.rackGrid = new RackGrid();
            this.rackGrid.createGrid(rackFloor);
            console.log(this.rackGrid);

        },

        
    });

    return RackStageView;
});

        
// <Transform render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" center="0,0,0" translation="0,0,0" rotation="0,0,0,0" scale="1,1,1" scaleorientation="0,0,0,0">
//     <shape id="grid" render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" ispickable="true">
//         <appearance sorttype="auto">
//             <material id="gridMaterial" diffusecolor="#4682b4" transparency="0.65" ambientintensity="0.2" emissivecolor="0,0,0" shininess="0.2" specularcolor="0,0,0">
//             </material>
//         </appearance>
//         <indexedLineSet coordindex="#{coordinateConnections}" solid="true" ccw="true" usegeocache="true" lit="true" colorpervertex="true" colorindex="">
//             <coordinate point="-6.6 -5.4 -1 -6.6 5.4 -1 -6 -5.4 -1 -6 5.4 -1 -5.4 -5.4 -1 -5.4 5.4 -1 -4.8 -5.4 -1 -4.8 5.4 -1 -4.2 -5.4 -1 -4.2 5.4 -1 -3.6 -5.4 -1 -3.6 5.4 -1 -3 -5.4 -1 -3 5.4 -1 -2.4 -5.4 -1 -2.4 5.4 -1 -1.8 -5.4 -1 -1.8 5.4 -1 -1.2 -5.4 -1 -1.2 5.4 -1 -0.6 -5.4 -1 -0.6 5.4 -1 0 -5.4 -1 0 5.4 -1 0.6 -5.4 -1 0.6 5.4 -1 1.2 -5.4 -1 1.2 5.4 -1 1.8 -5.4 -1 1.8 5.4 -1 2.4 -5.4 -1 2.4 5.4 -1 3 -5.4 -1 3 5.4 -1 3.6 -5.4 -1 3.6 5.4 -1 4.2 -5.4 -1 4.2 5.4 -1 4.8 -5.4 -1 4.8 5.4 -1 5.4 -5.4 -1 5.4 5.4 -1 6 -5.4 -1 6 5.4 -1 -6.6 -5.4 -1 6 -5.4 -1 -6.6 -4.8 -1 6 -4.8 -1 -6.6 -4.2 -1 6 -4.2 -1 -6.6 -3.6 -1 6 -3.6 -1 -6.6 -3 -1 6 -3 -1 -6.6 -2.4 -1 6 -2.4 -1 -6.6 -1.8 -1 6 -1.8 -1 -6.6 -1.2 -1 6 -1.2 -1 -6.6 -0.6 -1 6 -0.6 -1 -6.6 0 -1 6 0 -1 -6.6 0.6 -1 6 0.6 -1 -6.6 1.2 -1 6 1.2 -1 -6.6 1.8 -1 6 1.8 -1 -6.6 2.4 -1 6 2.4 -1 -6.6 3 -1 6 3 -1 -6.6 3.6 -1 6 3.6 -1 -6.6 4.2 -1 6 4.2 -1 -6.6 4.8 -1 6 4.8 -1 -6.6 5.4 -1 6 5.4 -1 ">
//             </coordinate>
//         </indexedLineSet>
//     </shape>
// </Transform>