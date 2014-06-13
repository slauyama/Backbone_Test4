// Do not fully understand this code.
// Took this from https://github.com/MeoMix/StreamusChromeExtension/blob/master/src/js/foreground/application.js
define([
    //  CODE REVIEW SA - Comment is out of date and you should use consistent, lowercase capitalization for file paths.
    //  todo: create a collections folder to hold collections -- different than models
    'collections/Racks',
    'models/rackStage',
	//  CODE REVIEW SA - I like my views to end in 'view' because if the view needs a TopPanelList model you'll have naming conflicts.
    'views/topListPanel' 
], function(Racks, RackStage, TopPanelList) {
    'use strict';
    var Application = new Backbone.Marionette.Application();

    Application.addInitializer(function(){
        // Create a new racks. Racks automatically has the data
        // This should change in the future
        var racks = new Racks();

        // Pass in the racks collection to the rackStage and the topPanelList
        var rackStage = new RackStage(racks);
        var topPanelList = new TopPanelList(racks);
    });

    Application.start();

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = Application;
});