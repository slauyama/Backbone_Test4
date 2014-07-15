// Do not fully understand this code.
// Took this from https://github.com/MeoMix/StreamusChromeExtension/blob/master/src/js/foreground/application.js
define([
    'collections/racks',
    'collections/topListItemDatas',
    'collections/topListItems',
    'views/rackOptionsView',
    'views/rackStageView',
    'views/topListPanelView' 
], function(
    Racks,
    TopListItemDatas, 
    TopListItems,
    RackOptionsView,
    RackStageView,
    TopListPanelView
) {
    'use strict';
    var Application = new Backbone.Marionette.Application();

    Application.addInitializer(function(){
        // Create three different regions

        // Create a rackOptionsView and bind it to its region
        var rackOptionsView = new RackOptionsView();

        var rackViewOptionsRegion = this.getRegion('rackViewOptions');
        rackViewOptionsRegion.show(rackOptionsView);

        // Create a new racks. Racks automatically has the data
        // Pass in the racks collection to the rackStage and the topPanelList
        var racks = new Racks();

        // Create a rackOptionsView and bind it to its region
        var rackStageView = new RackStageView(racks);

        // var rackStageRegion = this.getRegion('x3dScene');
        // rackStageRegion.show(rackStageView);

        var topListItems = new TopListItems();
        topListItems.load(racks);

        var topListPanelView = new TopListPanelView({
            collection: topListItems
        });

        var leaderDataRegion = this.getRegion('leaderDataRegion');
        leaderDataRegion.show(topListPanelView);
        

        this.listenTo(rackOptionsView, 'changingColor', function() {
            console.log("I listened to the ChangeColor Event")
            rackStageView.render();
        });
    });

    Application.addRegions({
        rackViewOptions: '#rack-view-options',
        x3dScene: '#x3dScene',
        leaderDataRegion: '#leader-data-region'
    });

    Application.start();

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = Application;
});