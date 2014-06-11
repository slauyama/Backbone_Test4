define([
	'views/topListItem'
], function(TopListItem){
	var topList = Backbone.Marionette.CompositeView.extend({
		tagName: 'ul',
		itemView: TopListItem,

		initialize: function(collection){
			this.first = new TopListItem({});
			this.second = new TopListItem({});
			this.third = new TopListItem({});
		}
	});

	return topList;
});

//  findMaxNumbers = (data, property, length) ->
//   list = []

//   iterator = 0
//   limit = Number.MAX_VALUE

//   findMax = (data, limit) ->
//     d3.max(data, (data)->
//       value = data[property]
//       if isNumber(value) and value < limit
//         return value
//     )

//   while (iterator < length)
//     list[iterator] = findMax(data, limit)
//     limit = list[iterator]
//     iterator++

//   list

// ### displays the top 3 leaders of one property ###
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