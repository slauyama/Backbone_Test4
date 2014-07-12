define([
], function(){
	'use strict';

	var TopListItem = Backbone.Model.extend({
		defaults: {
			header: ''
		}
	});

	return TopListItem;
});