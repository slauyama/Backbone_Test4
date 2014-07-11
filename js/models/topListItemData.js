define(function(){
	"use strict";

	var TopListItem = Backbone.Model.extend({
		defaults: {
			value: "",
			units: "",
			racks: ""
		}
	});

	return TopListItem;
});