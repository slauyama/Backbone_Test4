// Not use yet will be used later.

// topListPanel - Collection View - will contain 6 toplists
// topList - Composite View - will contain 3 topListItems
// topListItem - View

define([
	"collections/racks",
	"views/topListItemView",
	"collections/topListItems"
], function(Racks, TopListItemView, TopListItems) {
	"use strict";

	var TopListPanelView = Backbone.Marionette.CollectionView.extend({
		id: 'leader-data',
		itemView: TopListItemView,

		// Create 6 topLists and pass them the collection
		initialize: function(){
			var that = this;
			
			// I attached all lists to the topListPanel
		    // this.powerActual = new TopListView({
		  		// type: "powerActual",
		  		// header: "Power",
		    //     maxNumbers: this.collection.findMaxNumber("powerActual", 3),
		    //     units: "oz",
		    //     collection: bogus
		    // });

		    // this.heatCurrent = new TopListView({
		    //     type: "heatCurrent",
		    //     header: "Heat",
		    //     maxNumbers: this.collection.findMaxNumber("heatCurrent", 3),
		    //     units: "oz",
		    //     collection: bogus
		    // });

		    // this.weightCurrent = new TopListView({
		    //     type: "weightCurrent",
		    //     header: "Weight",
		    //     maxNumbers: this.collection.findMaxNumber("weightCurrent", 3),
		    //     units: "oz",
		    //     collection: bogus
		    // });

		    // this.usedUnitsCurrent = new TopListView({
		    //     type: "usedUnitsCurrent",
		    //     header: "Used Units",
		    //     maxNumbers: this.collection.findMaxNumber("usedUnitsCurrent", 3),
		    //     units: "oz",
		    //     collection: bogus
		    // });

		    // this.largestUnitLocation = new TopListView({
		    //     type: "largestUnitLocation",
		    //     header: "Largest Unit Location",
		    //     maxNumbers: this.collection.findMaxNumber("largestUnitLocation", 3),
		    //     units: "oz",
		    //     collection: bogus
		    // });

		    // this.largestUnitSize = new TopListView({
		    //     type: "largestUnitSize",
		    //     header: "Largest Unit Size",
		    //     maxNumbers: this.collection.findMaxNumber("largestUnitSize", 3),
		    //     units: "oz",
		    //     collection: bogus
		    // });

		    
		    // $(this.ui.place).append(this.render().el);

		    // Not good practice Dont know how to automatically append it to the section
		    // this.allTopLists = [this.powerActual, this.heatCurrent, this.weightCurrent, this.usedUnitsCurrent, this.largestUnitLocation, this.largestUnitSize];
		    
		    // this.allTopLists.forEach(function(topList) {
		    // 	this.$el.append(topList.render().el);
		    // }.bind(this));    

		    // this.triggerMethod('show');
		}
	});

	return TopListPanelView;
});