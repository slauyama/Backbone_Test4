// RackStage requires a racks view and will also require a rackFloorView
// I might want to change how the buttons by making them with a template
// Not sure if making a button is too small for a view


define([
    "text!templates/rackOptionsTemplate.html"
], function(RackOptionsTemplate) {
    "use strict";

    var RackOptionsView = Backbone.Marionette.ItemView.extend({
        template: _.template(RackOptionsTemplate),
        templateHelpers: {
            viewButtons: [
                {
                    title:"Top View", className: "view-button1 selected-view"
                },
                {
                    title:"Front View", className: "view-button2"
                },
                {
                    title:"Left View", className: "view-button3"
                },
                {
                    title:"Right View", className: "view-button4"
                },
                {
                    title:"Back View", className: "view-button5"
                },
                {
                    title: "Perspective", className: "view-button6"
                }
            ],
            
            colorButtons: [
                {
                    title:"Power", className: "color-button selected-color"
                },
                {
                    title:"Weight", className: "color-button"
                },
                {
                    title:"Heat", className: "color-button"
                }
            ],

            checkboxes: [
                {
                    title:"Display Grid", value:"grid-toggle", property: "checked"
                },
                {
                    title:"Shuffle Views", value:"view-shuffle"
                },
                {
                    title:"Display Names", value:"names-toggle"
                }
            ]
        },

        ui: {
            cameraOptions: '.camera-option',
            colorOptions: '.color-option',
            viewShuffle: '#view-shuffle',
        },

        events: {
            'click .camera-option .button': 'toggleCamera',
            'click .color-option .button': 'toggleColor',
            'click #grid-toggle' : 'toggleGridTransparency',
            'click #view-shuffle' : 'shuffleViewActivated',
            'click #names-toggle' : 'toggleNames'
        },

        onShow: function() {
            console.log("RackOptionsView onShow");
            // Call the first view in the list of views
            Backbone.Wreqr.radio.channel('rack-options').commands.execute('callFirstCamera');
            // try {
            //     document.getElementById(this.ui.cameraOptions.children()[0].value).setAttribute('set_bind', 'true');
            // } catch(exception) {
            //     return "Cannot call the first view";
            // }

            $('h3[title!=""]').qtip();
        },

        shuffleView: function() {
            var currentView, currentNumber, targetNumber, targetView, viewTotal;
            
            viewTotal = this.ui.cameraOptions.children().length;

            currentView = $('.selected-view')[0];
            currentNumber = Number.parseInt(
                currentView.className.replace(new RegExp("(button|selected-view|view-button)+", "g"), "")
            );
            targetNumber = currentNumber === viewTotal ? 1 : currentNumber + 1;
            targetView = $('.view-button' + targetNumber);

            $('.selected-view').removeClass('selected-view');
            targetView.addClass("selected-view");

            document.getElementById(targetView[0].value).setAttribute('set_bind', 'true');
        },

        /* if shuffle is clicked it will call shuffleView every 5sec */
        shuffleViewActivated: function() {
            if (this.ui.viewShuffle[0].checked === true) {
                this.shuffleId = setInterval((function() {
                    this.shuffleView();
                }).bind(this), 5000);
            } else {
                window.clearInterval(this.shuffleId);
            }
        },

        toggleCamera: _.throttle(function(event) {
            if (event.currentTarget.className.lastIndexOf("selected-view") === -1) {
                // Should not be using event.currentTarget but will figure that out later
                // Should be setting up click events and looking at where it click (not sure)
                $('.selected-view').removeClass('selected-view');
                event.currentTarget.className += " selected-view";

                // Creating a event in the rack-options channel.
                // RackViewpointsView will listen to it.
                try {
                    Backbone.Wreqr.radio.channel('rack-options').vent.trigger('changeCamera', event.currentTarget.value);
                } catch(exception) {
                    console.log("Cannot find " + event.currentTarget.value + " '" + exception + "'")
                }
            }
            
        }, 1500),

        toggleColor: function(event) {
            if (event.currentTarget.className.lastIndexOf("selected-color") === -1) {
                // Removing all instances of selected-color and only adding it to the current target
                $('.selected-color').removeClass('selected-color');
                event.currentTarget.className += " selected-color";
                
                // Sending a signal into the rack-options channel
                Backbone.Wreqr.radio.channel('rack-options').vent.trigger('changeColor', event.currentTarget.value);
            }
        },

        toggleGridTransparency: function() {
            // Using the radio channel to trigger an event.
            Backbone.Wreqr.radio.channel('rack-options').vent.trigger('gridClicked');    
        },

        toggleNames: function() {
            // Triggers and event caught in racksView
            Backbone.Wreqr.radio.channel('rack-options').vent.trigger('toggleTextTransparency');
        }
    });

    return RackOptionsView;
});