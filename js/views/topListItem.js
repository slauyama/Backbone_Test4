// Individual Item for a todo list
define([],
function(){
	"use strict";

	var TopListItem = Backbone.Marionette.ItemView.extend({
		tagName: 'li',

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