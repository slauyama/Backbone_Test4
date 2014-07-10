define(function(){
	"use strict";

	var RackPointlight = Backbone.Model.extend({
		default: {
			intensity: "",
		    color: "",
		    attenuation: "",
		    location: "",
		    radius: ""
		}
	});

	return RackPointlight;
});