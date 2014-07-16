// Config File
define(function() {
	"use strict";
	require.config({
		//baseUrl: 'js',

		paths: {
			'backbone': 'bower_components/backbone/backbone',
			'd3': 'bower_components/d3/d3',
			'jquery': 'bower_components/jquery/dist/jquery',
			'marionette': 'bower_components/marionette/lib/core/backbone.marionette',
			'qtip2': 'bower_components/qTip2/jquery.qtip',
			// Had to change the pathway of this module.
			// Must be a sibling to your "data-main" main.js script
			// http://requirejs.org/docs/download.html
			'text': 'requireText',
			'underscore': 'bower_components/underscore/underscore',
			'x3dom': 'bower_components/x3dom/x3dom'
		}, 
		
		shim: {
			'backbone': {
				deps: ['jquery', 'underscore'],
				exports: 'Backbone'
			},
			
			'd3': {
				exports: 'd3'
			},
			
			'jquery': {
				exports: '$'
			},
			
			'marionette': {
				deps: ['jquery', 'underscore', 'backbone'],
				exports: 'Backbone.Marionette'
			},

			'qtip2': {
				deps: ['jquery'],
				exports: 'qtip2'
			},

			'underscore': {
				deps: ['jquery'],
				exports: '_'
			},

			// Not sure if this is correct
			// Is there any dependencies on require?
			'text': {
				exports: 'text'
			},

			'x3dom': {
				exports: 'x3d'
			}

		}
	});
});