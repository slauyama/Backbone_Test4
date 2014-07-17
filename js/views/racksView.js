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
	    tagName: 'group',

	    handleRackClick: function() {
            console.log("I handled the rack click");
        },

	    onRender: function() {
	    	// Not correct. Just a hack
            // Me and Russ Cannot figure out why d3 isnt correctly loading
            var d3 = require('d3');
            
            _.defer(function() {
                console.log("defering function", d3.selectAll('.rack').node());
                _.each(d3.selectAll('.rack'), function(rack) {
                	console.log(rack.node());
                	rack.node().addEventListener('click', this.handleRackClick);
                });
            });
	    } 	
	});

	return RacksView;
});