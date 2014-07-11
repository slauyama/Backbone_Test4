define([
    'models/topListItemData'
], function(TopListItemData){
	'use strict';

	var TopListItemDatas = Backbone.Collection.extend({
		model: TopListItemData
	});

	return TopListItemDatas;
});