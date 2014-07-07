// Not used yet. Will be used to for the 

define([
	'views/topListItemView'
], function(TopListItemView){

	var TopListView = Backbone.Marionette.CompositeView.extend({
		tagName: 'ul',
		itemView: TopListItemView,

		// Make 3 topListItems per topList
		initialize: function(collection){
			console.log("initialize topListView");
	
			// SEAN LOOK HERE
			// Not sure if I should be receiving the data from the model here
			// Was told that Model should have method and should communicate by event
			var test = collection.findMaxNumber("powerActual", 3);
			console.log(test);
			this.first = new TopListItemView({});
			this.second = new TopListItemView({});
			this.third = new TopListItemView({});
		},

		render: function() {
			console.log("rendering TopListView");
		    this.$el.append(this.first.render().el);
		    this.$el.append(this.second.render().el);
		    this.$el.append(this.third.render().el);
		    return this;
		},

		getTopThreeValues: function (data, property, className, units) {
			var counter, dataSubset, datum, filterData, maxValueList, stringValues, target, _i, _len;
			maxValueList = findMaxNumbers(data, property, 3);
			stringValues = [];

			/* Dummy Function used to avoid making function in loop */

			/* Filters all data that match the same property */
			filterData = (function() {
			    var _i, _len, _results;
			    _results = [];
			
			    for (_i = 0, _len = data.length; _i < _len; _i++) {
			      datum = data[_i];
			      _results.push(datum[property] === maxValueList[counter]);
			    }

			    return _results;
			})();

			counter = 0;
			while (counter < maxValueList.length) {

			    /* filter out all data with a particular value */
			    dataSubset = filterData;

			    /* change value to a string and add the units */
			    stringValues[counter] = maxValueList[counter] + units + " rack" + (dataSubset.length > 1 ? "s:" : ":");

			    /* add the names of the rack to the string */
			    for (_i = 0, _len = dataSubset.length; _i < _len; _i++) {
			        datum = dataSubset[_i];
			        stringValues[counter] += " " + datum.name;
			    }

			    /* add the number of rack to the string */
			    stringValues[counter] += " (" + dataSubset.length + " total)";
			    counter++;
			}
			
			counter = 0;

			  /* write the string into the innerHTML */
			while (counter < maxValueList.length) {
			    target = className + (counter + 1);
			    document.getElementsByClassName(target)[0].innerHTML = stringValues[counter];
			    counter++;
			}   
		
		}
	});

	return TopListView;
});

// getTopThreeValues = (data, property, className, units) ->
//   maxValueList = findMaxNumbers(data, property, 3)
//   stringValues = []

//   ### Dummy Function used to avoid making function in loop ###
//   ### Filters all data that match the same property ###
//   filterData = (datum[property] is maxValueList[counter] for datum in data)
 
//   counter = 0
//   while counter < maxValueList.length
//     ### filter out all data with a particular value ###
//     dataSubset = filterData
//     console.log dataSubset
//     ### change value to a string and add the units###
//     stringValues[counter] = maxValueList[counter] + units +
//       " rack" + (if dataSubset.length > 1 then "s:" else ":")
   
//     ### add the names of the rack to the string ###
//     stringValues[counter] += " " + datum.name for datum in dataSubset
//     ### add the number of rack to the string ###
//     stringValues[counter] += " (#{dataSubset.length} total)"
//     counter++

//   counter = 0
//   ### write the string into the innerHTML ###
//   while counter < maxValueList.length
//     target = className + (counter + 1)
//     document.getElementsByClassName(target)[0].innerHTML = stringValues[counter]
//     counter++
   
//   return