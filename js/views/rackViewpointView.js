define(function(){
	"use strict";

	// console.log(RackViewTemplate);
	var RackViewpointView = Backbone.Marionette.ItemView.extend({
	    tagName: 'viewpoint',
	    // No template is being used. Just on line of html.
	    template: _.template(''),
	    
	    modelEvents: {
	    	"change:setBind": "_changeSetBind"
	    },
	    
	    attributes: function() {
	    	return {
	    		id: this.model.get('id'),
	    		centerOfRotation: this.model.get('centerOfRotation'),
	    		position: this.model.get('position'),
	    		orientation: this.model.get('orientation'),
	    		fieldOfView: this.model.get('fieldOfView')
	    	};
	    },

	    // Any changes to the model's setBind attibute will change the el's 'set_bind' attribute
	    _changeSetBind: function(model, setBind) {
	    	this.el.setAttribute('set_bind', setBind);
	    }

	});

	return RackViewpointView;
});