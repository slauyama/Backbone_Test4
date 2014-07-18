define([
	'text!templates/topListItemDataTemplate.html',
], function(TopListItemDataTemplate, Utility){
	'use strict';

	var TopListItemDataView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: _.template(TopListItemDataTemplate),
		templateHelpers: {
		},

		onRender: function() {
			// Cannot figure out for all my life how to access the width properties
			// With the width properties I could detect if there is overflow or not
			// Then I will use qtip to make a tool tip

			// Problem is that item is not fully rendered. Is rendered but is not on page
			_.defer(function() {
                // console.log(this, this.el.clientWidth, this.el.scrollWidth);
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
            }.bind(this));
			
		}
	});

	return TopListItemDataView;
});