// Not use yet will be used later.

// topListPanel - Collection View - will contain 6 toplists
// topList - Composite View - will contain 3 topListItems
// topListItem - View

define([
	"collections/racks",
	"views/topListView"
], function(Racks, TopListView) {
	"use strict";

	var TopListPanel = Backbone.Marionette.CollectionView.extend({
		ui: {
            place: '#leader-data'
        },

		// Create 6 topLists and pass them the collection
		initialize: function(collection){
			console.log("initialize topListPanel")
			// I attached all lists to the topListPanel
		    this.powerActual = new TopListView({
		  		type: "powerActual",
		  		header: "Power",
		        collection: collection,
		        units: "oz"
		    });

		    this.heatCurrent = new TopListView({
		        type: "heatCurrent",
		        header: "Heat",
		        collection: collection,
		        units: "oz"
		    });

		    this.weightCurrent = new TopListView({
		        type: "weightCurrent",
		        header: "Weight",
		        collection: collection,
		        units: "oz"
		    });

		    this.usedUnitsCurrent = new TopListView({
		        type: "usedUnitsCurrent",
		        header: "Used Units",
		        collection: collection,
		        units: "oz"
		    });

		    this.largestUnitLocation = new TopListView({
		        type: "largestUnitLocation",
		        header: "Largest Unit Location",
		        collection: collection,
		        units: "oz"
		    });

		    this.largestUnitSize = new TopListView({
		        type: "largestUnitSize",
		        header: "Largest Unit Size",
		        collection: collection,
		        units: "oz"
		    });

		    
		    // $(this.ui.place).append(this.render().el);

		    // Not good practice Dont know how to automatically append it to the section
		    //
		    $(this.ui.place).append(this.powerActual.render().el);
		    $(this.ui.place).append(this.heatCurrent.render().el);
		    $(this.ui.place).append(this.weightCurrent.render().el);
		    $(this.ui.place).append(this.usedUnitsCurrent.render().el);
		    $(this.ui.place).append(this.largestUnitLocation.render().el);
		    $(this.ui.place).append(this.largestUnitSize.render().el);		    

		    this.triggerMethod('show');
		}
	});

	return TopListPanel;
});