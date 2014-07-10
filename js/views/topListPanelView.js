// Not use yet will be used later.

// topListPanel - Collection View - will contain 6 toplists
// topList - Composite View - will contain 3 topListItems
// topListItem - View

define([
	"collections/racks",
	"views/topListView",
	"collections/topListItems"
], function(Racks, TopListView, TopListItems) {
	"use strict";

	var TopListPanel = Backbone.Marionette.ItemView.extend({
		itemView: TopListView,
		ui: {
            place: '#leader-data'
        },

		// Create 6 topLists and pass them the collection
		initialize: function(collection){
			var that = this;

			var bogus = new TopListItems();
			bogus.add({
				value: "t",
				units: "t",
				racks: "t",
			});
			
			bogus.add({
				value: "st",
				units: "st",
				racks: "st",
			});
			
			bogus.add({
				value: "sta",
				units: "sta",
				racks: "sta",
			});

			// I attached all lists to the topListPanel
		    this.powerActual = new TopListView({
		  		type: "powerActual",
		  		header: "Power",
		        maxNumbers: collection.findMaxNumber("powerActual", 3),
		        units: "oz",
		        collection: bogus
		    });

		    this.heatCurrent = new TopListView({
		        type: "heatCurrent",
		        header: "Heat",
		        maxNumbers: collection.findMaxNumber("heatCurrent", 3),
		        units: "oz",
		        collection: bogus
		    });

		    this.weightCurrent = new TopListView({
		        type: "weightCurrent",
		        header: "Weight",
		        maxNumbers: collection.findMaxNumber("weightCurrent", 3),
		        units: "oz",
		        collection: bogus
		    });

		    this.usedUnitsCurrent = new TopListView({
		        type: "usedUnitsCurrent",
		        header: "Used Units",
		        maxNumbers: collection.findMaxNumber("usedUnitsCurrent", 3),
		        units: "oz",
		        collection: bogus
		    });

		    this.largestUnitLocation = new TopListView({
		        type: "largestUnitLocation",
		        header: "Largest Unit Location",
		        maxNumbers: collection.findMaxNumber("largestUnitLocation", 3),
		        units: "oz",
		        collection: bogus
		    });

		    this.largestUnitSize = new TopListView({
		        type: "largestUnitSize",
		        header: "Largest Unit Size",
		        maxNumbers: collection.findMaxNumber("largestUnitSize", 3),
		        units: "oz",
		        collection: bogus
		    });

		    
		    // $(this.ui.place).append(this.render().el);

		    // Not good practice Dont know how to automatically append it to the section
		    this.allTopLists = [this.powerActual, this.heatCurrent, this.weightCurrent, this.usedUnitsCurrent, this.largestUnitLocation, this.largestUnitSize];
		    
		    this.allTopLists.forEach(function(topList) {
		    	$(that.ui.place).append(topList.render().el);
		    });    

		    this.triggerMethod('show');
		}
	});

	return TopListPanel;
});