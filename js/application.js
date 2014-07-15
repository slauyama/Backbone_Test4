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
        
        var rackOptionsView = new RackOptionsView();
        this.listenTo(rackOptionsView, 'changingColor', function() {
            console.log("I listened to the ChangeColor Event")
            // racksView.render();
        });

        var rackViewOptionsRegion = this.getRegion('rackViewOptions');
        rackViewOptionsRegion.show(rackOptionsView);

        // Create a new racks. Racks automatically has the data
        // This should change in the future
        var racks = new Racks();

        // Pass in the racks collection to the rackStage and the topPanelList
        var rackStage = new RackStageView(racks);

        


        var topListItems = new TopListItems();
        topListItems.load(racks);

        var topListPanelView = new TopListPanelView({
            collection: topListItems
        });

        var leaderDataRegion = this.getRegion('leaderDataRegion');
        leaderDataRegion.show(topListPanelView);
    });

    Application.addRegions({
        rackViewOptions: 'rack-view-options',
        x3dScene: '#x3dScene',
        leaderDataRegion: '#leader-data-region'
    });

    Application.start();

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = Application;
});