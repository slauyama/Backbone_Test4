// Config File
define(function() {
	"use strict";
	console.log("config file");
	require.config({
		//baseUrl: 'js',

		paths: {
			'backbone': 'bower_components/backbone/backbone',
			'd3': 'bower_components/d3/d3',
			'jquery': 'bower_components/jquery/dist/jquery',
			'marionette': 'bower_components/marionette/lib/core/backbone.marionette',
			'require-text': 'bower_components/requirejs/requireText',
			'underscore': 'bower_components/underscore/underscore',
			'x3dom': 'bower_components/x3dom/x3dom'
		}, 
		
		shim: {
			// 'underscore': ['jquery'],
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

			'underscore': {
				deps: ['jquery'],
				exports: '_'
			},

			'require-text': {
				exports: 'require-text'
			},

			'x3dom': {
				exports: 'x3d'
			}

		}
	});
});