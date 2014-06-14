// Individual Item for a todo list
define([],
function(){
	"use strict";

	var TopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
<<<<<<< HEAD:js/views/topListItemView.js
		className: 'topListItem'
=======

		//  CODE REVIEW SA - You can just use the 'className' property ie: className: 'topListItem'
	    attributes: function() {
	    	// Give the item a class
		    return {
	            class: 'topListItem'
	        };
	    },
>>>>>>> origin/templating:js/views/topListItem.js

	    // Should be using templating
		render: function(){
			console.log("rendering TopListItem");

		    this.$el.innerHTML = 'Hello';
		    return this;
		}

	});

	return TopListItemView;
});