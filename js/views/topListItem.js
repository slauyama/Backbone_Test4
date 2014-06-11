define([],
function(){
	"use strict";

	var TopListItem = Backbone.Marionette.ItemView.extend({
		tagName: 'li',

	    attributes: function() {
		    return {
	            class: 'topListItem'
	        };
	    },

		render: function(){
			console.log("rendering TopListItem");
		    
		    this.$el.innerHTML = 'Hello';
		    return this;
		}

	});

	return TopListItem;
});