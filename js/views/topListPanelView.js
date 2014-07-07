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
		// Create 6 topLists and pass them the collection
		initialize: function(collection){
			console.log("initialize topListPanel")
			// I attached all lists to the topListPanel
		    this.power = new TopListView({
		        collection: collection
		    });

		    this.heat = new TopListView({
		        collection: collection
		    });

		    this.weight = new TopListView({
		        collection: collection
		    });

		    this.usedUnits = new TopListView({
		        collection: collection
		    });

		    this.largestUnitLocation = new TopListView({
		        collection: collection
		    });

		    this.largestUnitSize = new TopListView({
		        collection: collection
		    });

			//  CODE REVIEW SA - Should be using a Region here.
		    // I want to append this panel to #leader-data
		    $('#leader-data').append(this.render().el);
		    this.triggerMethod('show');
		}
	});

	return TopListPanel;
});