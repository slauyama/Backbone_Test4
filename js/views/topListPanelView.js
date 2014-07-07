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
		    this.power = new TopListView(collection);

		    this.heat = new TopListView(collection);

		    this.weight = new TopListView(collection);

		    this.usedUnits = new TopListView(collection);

		    this.largestUnitLocation = new TopListView(collection);

		    this.largestUnitSize = new TopListView(collection);

			//  CODE REVIEW SA - Should be using a Region here.
		    // I want to append this panel to #leader-data
		    
		    // $(this.ui.place).append(this.render().el);

		    $(this.ui.place).append(this.power.render().el);
		    this.triggerMethod('show');
		}
	});

	return TopListPanel;
});