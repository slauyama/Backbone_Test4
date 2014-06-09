define(function(){
    "use strict";
    var Utility = {
        this.roundTo: function(number, amount){
            if (amount == null)
                amount = 0;
            return Math.round(number * Math.pow(10,amount)) / Math.pow(10,amount)
        },

        this.logDate: function(){
            if (arguments.length)
                timestamp = '[' + new Date().toUTCString() + '] '
            console.log(timestamp, arguments)
        },

        this.isNumber: function(number){
            return !isNaN(parseFloat(number)) && isFinite(number);
        }
    }
    
    return Utility;
);