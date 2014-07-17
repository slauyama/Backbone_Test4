// This view is solely responsible for handling the racks.
// All racks will be inside a group element. 
// This group element will have events bound to it.

define([
	'views/rackView'
], function(
	RackView 
){
	// Change Type of View to Item View
	var RacksView = Backbone.Marionette.CollectionView.extend({
	    itemView: RackView,
	    tagName: 'group'   	
	});

	return RacksView;
});