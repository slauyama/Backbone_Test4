// Creates a Utility object that contains some utility functions

define(function(){
    "use strict";
    var Utility = {
        // Can round to a certain placement
        roundTo: function(number, amount){
            if (amount == null)
                amount = 0;
            return Math.round(number * Math.pow(10,amount)) / Math.pow(10,amount)
        },

        // Adds a timesamp to your console.log
        logDate: function(){
            if (arguments.length)
                timestamp = '[' + new Date().toUTCString() + '] '
            console.log(timestamp, arguments)
        },

        // Not used but I wanted to keep it for a personal utility function
        isNumber: function(number){
            return !isNaN(parseFloat(number)) && isFinite(number);
        }
    };
    
    return Utility;
});