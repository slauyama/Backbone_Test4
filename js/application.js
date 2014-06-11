// Do not fully understand this code.
// Took this from https://github.com/MeoMix/StreamusChromeExtension/blob/master/src/js/foreground/application.js
define([
    //  todo: create a collections folder to hold collections -- different than models
    'collections/Racks',
    'models/rackStage',
    'views/topListPanel' 
], function(Racks, RackStage, TopPanelList) {
    'use strict';
    var Application = new Backbone.Marionette.Application();

    Application.addInitializer(function(){
        var racks = new Racks();
        var rackStage = new RackStage(racks);
        var topPanelList = new TopPanelList(racks);
    });

    Application.start();

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = Application;
});