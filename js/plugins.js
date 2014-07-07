//Plugins All the plugins I will be using
define([
	'backbone',
    'd3',
    'jquery',
	'marionette',
	'text',
	'underscore',
	'x3dom'
], function () {
    'use strict';
    console.log("loading application");
    //  Finally, load the application which will initialize the foreground:
    require(['application']);
    console.log("finished loading application");
});
