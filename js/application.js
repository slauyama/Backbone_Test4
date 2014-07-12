// Do not fully understand this code.
// Took this from https://github.com/MeoMix/StreamusChromeExtension/blob/master/src/js/foreground/application.js
define([
    'collections/racks',
    'collections/topListItemDatas',
    'collections/topListItems',
    'views/rackStageView',
    'views/topListPanelView' 
], function(Racks, TopListItemDatas, TopListItems, RackStageView, TopListPanelView) {
    'use strict';
    var Application = new Backbone.Marionette.Application();

    Application.addInitializer(function(){
        // Create a new racks. Racks automatically has the data
        // This should change in the future
        var racks = new Racks();

        // Pass in the racks collection to the rackStage and the topPanelList
        var rackStage = new RackStageView(racks);

        var topListItemDatas = new TopListItemDatas({
            racks: racks,
            type: "powerActual",
            units: "oz"
        });
        // bogus.add({
        //  value: "t",
        //  units: "t",
        //  racks: "t",
        // });
        
        // bogus.add({
        //  value: "st",
        //  units: "st",
        //  racks: "st",
        // });
        
        // bogus.add({
        //  value: "sta",
        //  units: "sta",
        //  racks: "sta",
        // });

        var topListItems = new TopListItems({
            type: "powerActual",
/*            header: "Power",
            maxNumbers: racks.findMaxNumber("powerActual", 3),
            units: "oz"*/
            data: topListItemDatas
        });

        var topListPanelView = new TopListPanelView({
            collection: topListItems
        });

        var leaderDataRegion = this.getRegion('leaderDataRegion');
        leaderDataRegion.show(topListPanelView);
    });

    Application.addRegions({
        leaderDataRegion: '#leader-data-region'
    });

    Application.start();

    //  Expose Application globally for referencing EventAggregator, etc. without incurring circular reference in requireJS.
    window.Application = Application;
});