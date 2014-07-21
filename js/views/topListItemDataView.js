define([
	'text!templates/topListItemDataTemplate.html',
], function(TopListItemDataTemplate, Utility){
	'use strict';

	var TopListItemDataView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: _.template(TopListItemDataTemplate),

		// Using onShow instead of onRender. 
		// This will run the code when it is displayed to the page.
		onShow: function() {
            if (this.el.scrollWidth > this.el.clientWidth){
            	this.$el.qtip({
            		content: {
			        	text: this.model.get('racks')
					},
					style: {
						width: 175
					},
					position: {
                        my: 'bottom left',
                        at: 'right top'
                    }
				});
            } 
		}
	});

	return TopListItemDataView;
});