// Individual Item for a todo list
define([],
function(){
	"use strict";

	var TopListItem = Backbone.Marionette.ItemView.extend({
		tagName: 'li',

		//  CODE REVIEW SA - You can just use the 'className' property ie: className: 'topListItem'
	    attributes: function() {
	    	// Give the item a class
		    return {
	            class: 'topListItem'
	        };
	    },

	    // Should be using templating
		render: function(){
			console.log("rendering TopListItem");
		    
		    this.$el.innerHTML = 'Hello';
		    return this;
		}

	});

	return TopListItem;
});