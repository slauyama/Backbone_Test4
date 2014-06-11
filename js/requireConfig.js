// Config File
define(function() {
	"use strict";
	console.log("config file");
	require.config({
		//baseUrl: 'js',

		paths: {
			'jquery': 'bower_components/jquery/dist/jquery',
			'underscore': 'bower_components/underscore/underscore',
			'backbone': 'bower_components/backbone/backbone',
			'marionette': 'bower_components/marionette/lib/core/backbone.marionette',
			'd3': 'bower_components/d3/d3',
			'x3dom': 'bower_components/x3dom/x3dom'
		}, 
		
		shim: {
			// 'underscore': ['jquery'],
			'jquery': {
				exports: '$'
			},

			'underscore': {
				deps: ['jquery'],
				exports: '_'
			},

			'backbone': {
				deps: ['jquery', 'underscore'],
				exports: 'Backbone'
			},

			'marionette': {
				deps: ['jquery', 'underscore', 'backbone'],
				exports: 'Backbone.Marionette'
			},

			'd3': {
				exports: 'd3'
			},

			'x3dom': {
				exports: 'x3d'
			}

		}
	});
});