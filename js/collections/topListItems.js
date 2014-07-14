define([
	"collections/TopListItemDatas",
	"models/topListItem"
], function(TopListItemDatas, TopListItem){

	var TopListItems = Backbone.Collection.extend({
		model: TopListItem,
		
		initialize: function() {
		},

		load: function(racks){
			this.createItemDatas(racks);

			this.add({
				header: "Power",
			    data: this.powerDatas
			});

			this.add({
				header: "Heat",
			    data: this.heatDatas
			});

			this.add({
				header: "Weight",
			    data: this.weightDatas
			});

			this.add({
				header: "Used Units",
			    data: this.usedUnitsDatas
			});

			this.add({
				header: "Largest Unit Location",
			    data: this.largestUnitLocationDatas
			});

			this.add({
				header: "Largest Unit Size",
			    data: this.largestUnitSizeDatas
			});
			console.log("TopListItems", this)
		},

		createItemDatas: function (racks) {
			this.powerDatas = new TopListItemDatas();
			this.powerDatas.load({
			    racks: racks,
			    type: "powerActual",
			    units: " Watts"
			});

			this.heatDatas = new TopListItemDatas();
			this.heatDatas.load({
			    racks: racks,
			    type: "heatCurrent",
			    units: " BTU"
			});
			
			this.weightDatas = new TopListItemDatas();
			this.weightDatas.load({
			    racks: racks,
			    type: "weightCurrent",
			    units: "oz"
			});
			
			this.usedUnitsDatas = new TopListItemDatas();
			this.usedUnitsDatas.load({
			    racks: racks,
			    type: "usedUnitsCurrent",
			    units: " Used Units"
			});
			
			this.largestUnitLocationDatas = new TopListItemDatas();
			this.largestUnitLocationDatas.load({
			    racks: racks,
			    type: "largestUnitLocation",
			    units: ""
			});
			
			this.largestUnitSizeDatas = new TopListItemDatas();
			this.largestUnitSizeDatas.load({
			    racks: racks,
			    type: "largestUnitSize",
			    units: " Units"
			});
		}
	});

	return TopListItems;
});