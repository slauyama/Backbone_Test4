define([
	'models/rackToolTip',
	'text!templates/rackToolTipTemplate.html'
], function(RackToolTip, RackToolTipTemplate) {
	"use strict";

	var RackToolTipView = Backbone.Marionette.ItemView.extend({
		tagName: 'ul',
		template: _.template(RackToolTipTemplate),

		// When the model is changed re-render the tooltip
		modelEvents: {
            "change": 'render'
        },

        initialize: function() {
	    	this.listenTo(Backbone.Wreqr.radio.channel('hover-rack').vent, 'hoverRack', this._hoverOverChange);
	    },

	    _hoverOverChange: function(obj) {
	    	this.model.set(obj);
	    }
	});

	return RackToolTipView;
});