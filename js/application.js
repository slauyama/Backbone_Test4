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
    var RackApplication = new Backbone.Marionette.Application();

    RackApplication.addInitializer(function(){
        // Create three different regions - rackOptions, rackStage, topListPanel

        // Create a new racks. Racks automatically has the data
        // Pass in the racks collection to the rackStage and the topPanelList
        var racks = new Racks();

        // Create a rackOptionsView and bind it to its region
        var rackStageView = new RackStageView({collection: racks});

        var rackStageRegion = this.getRegion('x3dScene');
        rackStageRegion.show(rackStageView);


        var topListItems = new TopListItems();
        topListItems.load(racks);

        var topListPanelView = new TopListPanelView({
            collection: topListItems
        });


        var leaderDataRegion = this.getRegion('leaderDataRegion');
        leaderDataRegion.show(topListPanelView);

        // Create a rackOptionsView and bind it to its region
        var rackOptionsView = new RackOptionsView();

        var rackViewOptionsRegion = this.getRegion('rackViewOptions');
        rackViewOptionsRegion.show(new RackOptionsView);

        // Have to use the regions current view in order to access the custom event
        // Simply reshowing the current view onto the region
        rackStageRegion.currentView
            .listenTo(rackViewOptionsRegion.currentView, 'changingColor', function() {
                this.show(this.currentView, {forceShow: true});
            }.bind(rackStageRegion));

    });

    RackApplication.addRegions({
        rackViewOptions: '#rack-view-options',
        x3dScene: '#x3dScene',
        leaderDataRegion: '#leader-data-region'
    });

    RackApplication.start();

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = RackApplication;
});