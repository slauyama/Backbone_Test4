define(function(){
	"use strict";

	var RackPointlight = Backbone.Model.extend({
		default: {
			intensity: "",
		    color: "",
		    attenuation: "",
		    location: "",
		    radius: ""
		},

		initialize: function() {
			console.log("initialize RackPointlight")
		}
	});

	return RackPointlight;
});