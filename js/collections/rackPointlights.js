define([
	"models/rackPointlight"
], function(RackPointlight){

	var RackPointlights = Backbone.Collection.extend({
		model: RackPointlight,

		initialize: function(options) {
			console.log("initialize RackPointlights")
			this.rackFloor = options.rackFloor;
	        this.load();
	        console.log(this);
	    }, 

	    load: function(){
	    	// Create a left and right point light
	        this.add({
	            intensity: '.50',
	            color: '1.0 1.0 1.0',
	            attenuation: '1.0000 0.0000 0.0000',
	            location: (this.rackFloor.getSideDistance()) + " 0 0",
	            radius: '200.0'
	        });
	        this.add({
	            intensity: '.50',
	            color: '1.0 1.0 1.0',
	            attenuation: '1.0000 0.0000 0.0000',
	            location: (-1 * this.rackFloor.getSideDistance()) + " 0 0",
	            radius: '200.0'
	        });
	    }
	});

	return RackPointlights;

});