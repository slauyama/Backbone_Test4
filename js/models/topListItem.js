define([
], function(){
	'use strict';

	var TopListItem = Backbone.Model.extend({
		defaults: {
			type: ''
		}
	});

	return TopListItem;
});