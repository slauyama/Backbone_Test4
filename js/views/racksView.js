// This is misleading. This file renders all the racks but it also 
// appends a scene into the x3d element.

define([
	'collections/rackPointlights',
	'collections/rackViewpoints',
	'models/rackGrid',
	'views/rackGridView',
	'views/rackPointlightsView',
	'views/rackView',
	'views/rackViewpointsView'
], function(
	RackPointlights,
	RackViewpoints,
	RackGrid,
	RackGridView,
	RackPointlightsView,
	RackView, 
	RackViewpointsView
){
	// Change Type of View to Item View
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',
	    id: 'innerScene',
	    itemView: RackView,



	    initialize: function(options) {
	    	this.rackFloor = options.rackFloor;

	    	this.addLights();
	    	this.addViews();

	    	this.addGrid();
	    },

	    // Create some lights for the scene
        addLights: function() {
            
            var rackPointlights = new RackPointlights();
        	rackPointlights.load(this.rackFloor);

            this.allLights = new RackPointlightsView({
            	collection: rackPointlights
            });

			// Appending the innerHTML to avoid adding on the outer div
			// Probably not the right way to do this
			this.$el.append(this.allLights.render().el.innerHTML);
        },

        // Create some viewpoints for the scene
	    addViews: function() {
		    var rackViewpoints = new RackViewpoints();
        	rackViewpoints.load(this.rackFloor);

        	this.allViews = new RackViewpointsView({
        		collection: rackViewpoints
        	});

        	this.$el.append(this.allViews.render().el.innerHTML);
	    },

	    // Add the html for the grid.
	    // Will toggle transparencies
	    addGrid: function() {
	    	this.rackGrid = new RackGrid();
	    	this.rackGrid.createGrid(this.rackFloor);

	    	this.rackGridView = new RackGridView({
	    	    model: this.rackGrid
	    	});

	    	this.$el.append(this.rackGridView.render().el.innerHTML);
	    }


	});

	return RacksView;
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