// This is misleading. This file renders all the racks but it also 
// appends a scene into the x3d element.

define([
	'views/rackView',
	'models/rackViewpoint',
	'views/rackViewpointView',
	// 'models/rackPointlight',
	'collections/rackPointlights',
	// 'views/rackPointlightView',
	'views/rackPointlightsView'
], function(
	RackView, 
	RackViewpoint,
	RackViewpointView,
	// RackPointlight,
	RackPointlights,
	// RackPointlightView,
	RackPointlightsView
){
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    tagName: 'scene',
	    id: 'innerScene',

	    //itemview is marionette
	    itemView: RackView,

	    initialize: function(options) {
	    	this.rackFloor = options.rackFloor;

	    	this.addViews();
	    	this.addLights();
	    },

	    addViews: function() {
	    	var that = this;
		    /* Create some views */
			this.topView = new RackViewpointView(
				new RackViewpoint({
					id: "Top View",
					centerOfRotation: "0 0 0",
					position: "0 0 " + (this.rackFloor.getTopDistance()),
					orientation: "0.0 0.0 0.0 0.0",
					fieldOfView: '0.75'
				})
			);

			this.frontView = new RackViewpointView(
				new RackViewpoint({
					id: "Front View",
					centerOfRotation: "0 0 0",
					position: "0 " + (this.rackFloor.getFrontDistance()) + " 0",
					orientation: "1.0 0.0 0.0 1.570",
					fieldOfView: '0.95'
				})
			);

	        this.leftView = new RackViewpointView(
	        	new RackViewpoint({
		        	id: "Left View",
		        	centerOfRotation: "0 0 0",
		        	position: "" + (-1 * this.rackFloor.getSideDistance()) + " 0 0",
		        	orientation: "-0.50 0.50 0.5 " + (2.093 * 2),
		        	fieldOfView: '0.75'
	        	})
	        );
	    
	        this.rightView = new RackViewpointView(
	        	new RackViewpoint({
		        	id: "Right View",
		        	centerOfRotation: "0 0 0",
		        	position: "" + (this.rackFloor.getSideDistance()) + " 0 0.25",
		        	orientation: "0.50 0.50 0.50 2.093",
		        	fieldOfView: '0.75'
	        	})
	        );
	    
	        this.backView = new RackViewpointView(
	        	new RackViewpoint({
		        	id: "Back View",
		        	centerOfRotation: "0 0 0",
		        	position: "0 " + (this.rackFloor.getBackDistance()) + " -.5",
		        	orientation: "0.0 0.75 0.65 3.14",
		        	fieldOfView: '0.95'
	        	})
	        );
	    
	        this.perspectiveView = new RackViewpointView(
	        	new RackViewpoint({
		        	id: "Perspective",
		        	centerOfRotation: "0 0 0",
		        	position: "" + (this.rackFloor.getBackDistance() / 3) + " " + (-this.rackFloor.getSideDistance()) + " " + (this.rackFloor.getTopDistance() / 3),
		        	orientation: "1.0 0.25 0.25 1.25",
		        	fieldOfView: '0.95'
	        	})
	        );

	        console.log(this.topView.render());

	        this.allViews = [this.topView, this.frontView, this.leftView, this.rightView, this.backView, this.perspectiveView];

	        this.allViews.forEach(function (view) {
	            that.$el.append(view.el);
	        });
	    },

	    addLights2: function() {
	    	var that = this;

	        /* Create a Right and Left point Light */

	        this.rightPointLight = new RackPointlightView(
	        	new RackPointlight({
		        	intensity: '.50',
		            color: '1.0 1.0 1.0',
		            attenuation: '1.0000 0.0000 0.0000',
		            location: (this.rackFloor.getSideDistance()) + " 0 0",
		            radius: '200.0'
		        })
		    );
	        
	        this.leftPointLight = new RackPointlightView(
	        	new RackPointlight({
		        	intensity: '.50',
		            color: '1.0 1.0 1.0',
		            attenuation: '1.0000 0.0000 0.0000',
		            location: (-1 * this.rackFloor.getSideDistance()) + " 0 0",
		            radius: '200.0'
	        	})
	        );

	        this.allLights = [this.rightPointLight, this.leftPointLight];
			
			// When I manually append the light to the element
			// you do no require a template. There is only one elemnet
			// I think that this element is automatically given the 
			// properties
	        this.allLights.forEach(function (light) {
	            that.$el.append(light.el);
	        });
	    },

        addLights: function() {
            
            var rackPointlights = new RackPointlights();
        	rackPointlights.load(this.rackFloor);

            this.allLights = new RackPointlightsView({
            	collection: rackPointlights
            });

			// Appending the innerHTML to avoid adding on the outer div
			// Probably not the right way to do this
			this.$el.append(this.allLights.render().el.innerHTML);
        }

	});

	return RacksView;
});