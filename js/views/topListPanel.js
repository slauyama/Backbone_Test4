define([
	"collections/racks",
	"views/topList"
], function(Racks, TopList) {
	"use strict";

	var topListPanel = Backbone.Marionette.CollectionView.extend({
		initialize: function(collection){

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

		    console.log(this.render().el);
		    $('#leader-data').append(this.render().el);
		    this.triggerMethod('show');
		}
	});

	return topListPanel;
});


// topListPanel - Collection View 
// topList - Composite View
// topListItem - View