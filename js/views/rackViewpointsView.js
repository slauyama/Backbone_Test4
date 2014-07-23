define([
	"views/rackViewpointView" 
], function(RackViewpointView){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointsViews = Backbone.Marionette.CollectionView.extend({
	    childView: RackViewpointView,
	    tagName: 'group',

	    initialize: function() {
	    	this.listenTo(Backbone.Wreqr.radio.channel('rack-options').vent, "changeCamera", this._changeCamera)
	    },

	    _changeCamera: function(object) {
	    	this.collection.each(function(model) {
	    		if (model.id === object) {
	    			model.set('setBind', 'true');
	    		} else {
	    			model.set('setBind', '');
	    		}
	    	});
	    } 
	});

	return RackViewpointsViews;
});