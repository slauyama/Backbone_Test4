// Individual Item for a todo list
define([],
function(){
	"use strict";

	var TopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'topListItem',

	    // Should be using templating
		render: function(){
			console.log("rendering TopListItem");

		    this.$el.innerHTML = 'Hello';
		    return this;
		}

	});

	return TopListItemView;
});