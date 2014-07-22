// Do not fully understand this code.
// Took this from https://github.com/MeoMix/StreamusChromeExtension/blob/master/src/js/foreground/application.js
define([
    'collections/racks',
    'collections/topListItemDatas',
    'collections/topListItems',
    'models/rackToolTip',
    'views/rackOptionsView',
    'views/rackStageView',
    'views/rackToolTipView',
    'views/topListPanelView' 
], function(
    Racks,
    TopListItemDatas, 
    TopListItems,
    RackToolTip,
    RackOptionsView,
    RackStageView,
    RackToolTipView,
    TopListPanelView
) {
    'use strict';
    var RackApplication = new (Backbone.Marionette.Application.extend({
        _doStuff: function(){

        }
    }))();

    RackApplication.addInitializer(function(){
        // Create three different regions - rackOptions, rackStage, topListPanel

        // Create a new racks. Racks automatically has the data
        // Pass in the racks collection to the rackStage and the topPanelList
        var racks = new Racks();

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
        rackViewOptionsRegion.show(rackOptionsView);

        // Create a RackToolTip Model and View and bind it to its region
        var rackToolTip = new RackToolTip();
        var rackToolTipView = new RackToolTipView({
            model: rackToolTip
        });

        var rackToolTipRegion = this.getRegion('modelData');
        rackToolTipRegion.show(rackToolTipView);
    });

    RackApplication.addRegions({
        rackViewOptions: '#rack-view-options',
        x3dScene: '#x3dScene',
        leaderDataRegion: '#leader-data-region',
        modelData: '#model-Data'
    });

    RackApplication.start();

    // Application.vent.trigger('dlfksd', {});
    // Application.on('dlfksd', _doStuff);

    // _

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = RackApplication;
});