define([
	"views/rackViewpointView" 
], function(RackViewpointView){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointsViews = Backbone.Marionette.CollectionView.extend({
	    childView: RackViewpointView,
	    tagName: 'group',

	    initialize: function() {
		    // Listend to a signal from the rackOptionsView
		    // Calls the private function _changeCamera
	    	this.listenTo(Backbone.Wreqr.radio.channel('rack-options').vent, "changeCamera", this._changeCamera)
	    	this.listenTo(Backbone.Wreqr.radio.channel('rack-options').commands, "callFirstCamera", this._callFirstCamera)
	    },

	    _callFirstCamera: function(){
	    	debugger;
	    	this._changeCamera();
	    },

	    // Changes the setBind attribute in the model
	    // Any changes in that attribute are picked up by childView (rackViewpointView)
	    _changeCamera: function(object) {
	    	this.collection.each(function(model) {
	    		if (model.get('setBind') === 'true') {
	    			model.set('setBind', '');
	    		}
	    		if (model.id === object) {
	    			model.set('setBind', 'true');
	    		} 
	    	});
	    } 
	});

	return RackViewpointsViews;
});