define([
	"models/rackGrid",
	"text!templates/rackGridTemplate.html"
], function(RackGrid, RackGridTemplate) {

	var RackGridView = Backbone.View.extend({
		tagName: 'group',
		template: _.template(RackGridTemplate),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;			
		}
	});

	return RackGridView

});