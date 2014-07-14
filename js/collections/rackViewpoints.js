define([
	'models/rackViewpoint'
], function(RackViewpoint){
	
	var RackViewpoints = Backbone.Collection.extend({
		model: RackViewpoint,

		// Need to update these views. 
		// I want to change the Back Left and Right views to raise them a bit
		load: function(rackFloor) {
			this.add({
				id: "Top View",
				centerOfRotation: "0 0 0",
				position: "0 0 " + rackFloor.getTopDistance(),
				orientation: "0.0 0.0 0.0 0.0",
				fieldOfView: '0.75'
			});

			this.add({
				id: "Front View",
				centerOfRotation: "0 0 0",
				position: "0 " + rackFloor.getFrontDistance() + " " + (rackFloor.getTopDistance() / 3),
				orientation: "1.0 0.0 0.0 1.25",
				fieldOfView: '0.95'
			});

	        this.add({
	        	id: "Left View",
	        	centerOfRotation: "0 0 0",
	        	position: "" + (-1 * rackFloor.getSideDistance()) + " 0 0",
	        	orientation: "-0.50 0.50 0.5 " + (2.093 * 2),
	        	fieldOfView: '0.75'
        	});
	    
	        this.add({
	        	id: "Right View",
	        	centerOfRotation: "0 0 0",
	        	position: "" + rackFloor.getSideDistance() + " 0 0",
	        	orientation: "0.50 0.50 0.50 2.093",
	        	fieldOfView: '0.75'
        	});
	    
	        this.add({
	        	id: "Back View",
	        	centerOfRotation: "0 0 0",
	        	position: "0 " + rackFloor.getBackDistance() + " 0",
	        	orientation: "0.0 0.75 0.65 3.14",
	        	fieldOfView: '0.95'
        	});
	    
	        this.add({
	        	id: "Perspective",
	        	centerOfRotation: "0 0 0",
	        	position: "" + (rackFloor.getBackDistance() / 3) + " " + (-rackFloor.getSideDistance()) + " " + (rackFloor.getTopDistance() / 3),
	        	orientation: "1.0 0.25 0.25 1.25",
	        	fieldOfView: '0.95'
        	});
		}	
	});

	return RackViewpoints;
})