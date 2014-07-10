// Individual Item for a todo list
define([
], function(){
	"use strict";

	var TopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'topListItem',

	    // Should be using templating
		render: function(){
		    this.$el.html(this.options.value + this.options.units);
		    return this;
		}

	});

	return TopListItemView;
});