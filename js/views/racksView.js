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

/* Code for dealing with hover over
//Round a float value to x.xx format
function roundWithTwoDecimals(value)
{
	return (Math.round(value * 100)) / 100;
}

//Handle click on any group member
function handleGroupClick(event)
{
	//Mark hitting point
	$('#marker').attr('translation', event.hitPnt);
	console.log(event);
	
	//Display coordinates of hitting point (rounded)
	var coordinates = event.hitPnt;
	$('#coordX').html(roundWithTwoDecimals(coordinates[0]));
	$('#coordY').html(roundWithTwoDecimals(coordinates[1]));
	$('#coordZ').html(roundWithTwoDecimals(coordinates[2]));
}

//Handle click on a shape
function handleSingleClick(shape)
{
	$('#lastClickedObject').html($(shape).attr("def"));
	
}

$(document).ready(function(){
	//Add a onclick callback to every shape
	$("shape").each(function() {
		$(this).attr("onclick", "handleSingleClick(this)");
	});
});
*/