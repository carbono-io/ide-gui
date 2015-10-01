'use strict';

(function () {

    var STATE_CLASSES = [
        'open',
        'closed',
        'disabled'
    ];

    var MODE_LAYOUTS = {

    };

    Polymer({
        is: 'carbo-body',

        properties: {
            canvasInteractionMode: {
                type: String,
                notify: true,
                observer: '_canvasInteractionModeChanged'
            },

            editionMode: {
                type: String,
                notify: true,
                observer: '_editionModeChanged'
            }
        },

        setSectionState: function (sectionName, state) {

            // get the section
            var section = this.$[sectionName];

            if (!section) {
                throw new Error('No section in carbo body named ' + sectionName);
            }

            console.log('body set section ' + sectionName + ' to ' + state);

            STATE_CLASSES.forEach(function (stateClass) {
                var toggle = stateClass === state;

                Polymer.Base.toggleClass(stateClass, toggle, section);
            });
        },

        ready: function () {
            this.openLeftPanel();
            this.openCanvas();
            this.closeBox();
            this.openRightPanel();

            this.setSectionState('middle-bar', 'open');
        },

        openLeftPanel: function () {
            this.setSectionState('left', 'open');
        },

        openCanvas: function () {
            this.setSectionState('canvas-container', 'open');
        },

        openBox: function () {
            this.setSectionState('floating-box', 'open');
        },

        closeBox: function () {
            this.setSectionState('floating-box', 'closed');
        },

        openRightPanel: function () {
            this.setSectionState('right', 'open');
        },


        _canvasInteractionModeChanged: function (interactionMode, oldInteractionMode) {
            // if (interactionMode === 'insertion') {
            //     this.
            // }
        },

        _editionModeChanged: function (editionMode, oldEditionMode) {
            if (editionMode === 'navigation') {
                Polymer.Base.toggleClass('disabled', true, this.$['floating-box']);

            } else {

                Polymer.Base.toggleClass('disabled', false, this.$['floating-box']);
                // this.setSectionState('floating-box', 'open');
            }
        },

        // TODO: this is a very bad implementation
        activateFloatingBox: function () {
            this.set('editionMode', 'graphical-edition');
        }
    });

})();
