define(function(){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointView = Backbone.Marionette.ItemView.extend({
	    tagName: 'viewpoint',
	    template: _.template(''),
	    attributes: function() {
	    	return {
	    		id: this.model.get('id'),
	    		centerOfRotation: this.model.get('centerOfRotation'),
	    		position: this.model.get('position'),
	    		orientation: this.model.get('orientation'),
	    		fieldOfView: this.model.get('fieldOfView')
	    	};
	    }

	});

	return RackViewpointView;
});