define([
    'models/topListItemData',
], function(TopListItemData){
	'use strict';

	var TopListItemDatas = Backbone.Collection.extend({
		model: TopListItemData,

		initialize: function(options) {
			this.maxValueList = options.racks.findMaxNumber(options.type, 3);
			this.units = options.units;

			this.load();
			this.getTopThreeValues(options.racks.models, options.type, this.maxValueList);
		},

		load: function() {
			console.log(this.maxValueList);

			this.add({
	            value: this.maxValueList[0],
	            units: this.units,
	            racks: 42
	        });
	        this.add({
	            value: this.maxValueList[1],
	            units: this.units,
	            racks: 42
	        });
	        this.add({
	            value: this.maxValueList[2],
	            units: this.units,
	            racks: 42
	        });
		},

		getTopThreeValues: function (racks, property, maxValueList) {
			var counter, dataSubset, datum, filterData, stringValues, target, i, _len;
			stringValues = [];
			console.log(racks);

			/* Dummy Function used to avoid making function in loop */

			/* Filters all data that match the same property */
			filterData = (function() {
			    var j, results;
			    results = [];
				
				for (j = 0; j < maxValueList.length; j++) {
				    results[j] = racks.filter(function(rack){
						return maxValueList[j] === rack.get(property);
					});
				}

				console.log(results);

			    return results;
			})();
			console.log(filterData);
		}
	});

	return TopListItemDatas;
});