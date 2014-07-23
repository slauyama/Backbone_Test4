define(function() {
	"use strict";

	var RackToolTip = Backbone.Model.extend({
		defaults: {
			componentIDData: "N/A",
			nameData: "N/A",
			powerData: "N/A",
			heatData: "N/A",
			weightData: "N/A",
			usedUnitsData: "N/A",
			unitLocationData: "N/A",
			unitSizeData: "N/A",
			powerADData: "N/A"
		}, 

		initialize: function() {
			this.set({
				componentIDData: "",
				nameData: "",
				powerData: "",
				heatData: "",
				weightData: "",
				usedUnitsData: "",
				unitLocationData: "",
				unitSizeData: "",
				powerADData: ""
			});
		}
	});	

	return RackToolTip;
});