define(function() {
	"use strict";

	var rackViewPoint = Backbone.Model.extend({
		defaults: {
			id: "",
			centerOfRotation: "",
			position: "",
			orientation: "",
			fieldOfView: ""
		}
	});

	return rackViewPoint;
});