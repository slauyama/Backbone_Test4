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

			var rackValues, i;

			rackValues = [];
			for (i = 0; i < this.racks.length; i++) {
				rackValues[i] = "";
				this.racks[i].forEach(function(rack){
					rackValues[i] += " " + rack.attributes.name;
				});
			}

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
			var filterData;

			/* Filters all data that match the same property */
			filterData = (function() {
			    var j, results;
			    results = [];
				
				for (j = 0; j < maxValueList.length; j++) {
				    results[j] = racks.filter(function(rack){
						return maxValueList[j] === rack.get(property);
					});
				}

			    return results;
			})();

			return filterData;
		}
	});

	return TopListItemDatas;
});