define([
	"models/rackPointlight"
], function(RackPointlight){

	var RackPointlights = Backbone.Collection.extend({
		model: RackPointlight,

		initialize: function(options) {
	        this.load(options.rackFloor);
	    }, 

	    load: function(){
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
	            location: (-1 * this.rackFloor.getSideDistance())
	            radius: '200.0'
	        });
	    }
	});

	return RackPointlights;

});