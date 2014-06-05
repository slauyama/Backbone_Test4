/* Simon utility file */

Math.roundTo = function(num, amount) {
  if (amount == null) {
    amount = 0;
  }
  return Math.round(num * Math.pow(10, amount)) / Math.pow(10, amount);
};

/* Adds a timestamp to console.log */
console.logDate = function() {
  var timestamp;
  if (arguments.length) {
    timestamp = '[' + new Date().toUTCString() + '] ';
    return console.log(timestamp, arguments);
  }
};
