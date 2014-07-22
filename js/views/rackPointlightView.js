// This view does use a template
// Not sure if it can be built without one but 
// I want to use the attributes property if it is possible

define(function(){
	"use strict";

	var RackPointlightView = Backbone.Marionette.ItemView.extend({
		tagName: 'pointlight',
		template: _.template(''),
		attributes: function(){
			return {
				intensity: this.model.get('intensity'),
	            color: this.model.get('color'),
	            attenuation: this.model.get('attenuation'),
	            location: this.model.get('location'),
	            radius: this.model.get('radius')
			}
		}
	});

	return RackPointlightView;
});