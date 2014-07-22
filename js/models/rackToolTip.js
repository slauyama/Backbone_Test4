define(function() {

	var RackToolTip = Backbone.Model.extend({
		defaults: {
			componentIDData: "",
			nameData: "",
			powerData: "",
			heatData: "",
			weightData: "",
			usedUnitsData: "",
			unitLocationData: "",
			unitSizeData: "",
			powerADData: ""
		}, 

		initialize: function() {
			console.log("RackToolTip",this);
			this.set('componentIDData', "N/A");
			this.set('nameData', "N/A");
			this.set('powerData', "N/A");
			this.set('heatData', "N/A");
			this.set('weightData', "N/A");
			this.set('usedUnitsData', "N/A");
			this.set('unitLocationData', "N/A");
			this.set('unitSizeData', "N/A");
			this.set('powerADData', "N/A");
		}
	});	

	return RackToolTip;
});