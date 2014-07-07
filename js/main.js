// Main JS this will load the require config file then will load all plugins
require([
	//  Start by loading the requireJS configuration file:
	'requireConfig'
], function() {
	'use strict';
	//  Load all of the plugins needed by the foreground:
	console.log("loading plugin");
	require(['plugins']);
	console.log("finished loading plugin");
});