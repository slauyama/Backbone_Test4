// Not use yet will be used later.

// topListPanel - Collection View - will contain 6 toplists
// topList - Composite View - will contain 3 topListItems
// topListItem - View

define([
	"collections/racks",
	"views/topList"
], function(Racks, TopList) {
	"use strict";

	var topListPanel = Backbone.Marionette.CollectionView.extend({
		// Create 6 topLists and pass them the collection
		initialize: function(collection){
			// I attached all lists to the topListPanel
		    this.power = new TopList({
		        collection: collection
		    });

		    this.heat = new TopList({
		        collection: collection
		    });

		    this.weight = new TopList({
		        collection: collection
		    });

		    this.usedUnits = new TopList({
		        collection: collection
		    });

		    this.largestUnitLocation = new TopList({
		        collection: collection
		    });

		    this.largestUnitSize = new TopList({
		        collection: collection
		    });

		    // I want to append this panel to #leader-data
		    $('#leader-data').append(this.render().el);
		    this.triggerMethod('show');
		}
	});

	return topListPanel;
});