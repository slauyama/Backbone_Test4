define([
    'models/topListItemData',
], function(TopListItemData){
	'use strict';

	var TopListItemDatas = Backbone.Collection.extend({
		model: TopListItemData,

		initialize: function() {
		},

		load: function(options) {
			this.maxValueList = options.racks.findMaxNumber(options.type, 3);
			this.units = options.units;

			this.racks = this.getTopThreeValues(options.racks.models, options.type, this.maxValueList);

			var rackValues;

			rackValues = _.map(this.racks, function(rack) {
				var string = "Rack" + (rack.length > 1 ? "s": "") + ": ";

				rack.forEach(function(rackData){
					string += rackData.attributes.name + ", ";
				});

				// Removes the last comma and space added to the string
				return string.slice(0, -2);
			});

			this.add({
	            value: this.maxValueList[0],
	            units: this.units,
	            racks: rackValues[0]
	        });

	        this.add({
	            value: this.maxValueList[1],
	            units: this.units,
	            racks: rackValues[1]
	        });

	        this.add({
	            value: this.maxValueList[2],
	            units: this.units,
	            racks: rackValues[2]
	        });
		},

		getTopThreeValues: function (racks, property, maxValueList) {
			// mapped maxValueList into the return value.
			// The return value is all the racks that match the maxValueList value
			return _.map(maxValueList, function(maxValue){
				return racks.filter(function(rack){
					return maxValue === rack.get(property);
				});
			});
		}
	});

	return TopListItemDatas;
});