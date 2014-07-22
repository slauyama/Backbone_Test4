// Not use yet will be used later.

// topListPanel - Collection View - will contain 6 toplists
// topList - Composite View - will contain 3 topListItems
// topListItem - View

define([
	"collections/racks",
	"views/topListItemView",
], function(Racks, TopListItemView) {
	"use strict";

	var TopListPanelView = Backbone.Marionette.CollectionView.extend({
		id: 'leader-data',
		childView: TopListItemView
	});

	return TopListPanelView;
});