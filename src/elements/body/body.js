'use strict';

(function () {

    var STATE_CLASSES = [
        'open',
        'closed',
        'disabled'
    ];

    var IDE_MODES = {
        graphicalEdition: 'graphical-edition',
        codeEdition: 'code-edition',
        navigation: 'navigation',
    };


    Polymer({
        is: 'carbo-body',

        properties: {
            canvasInteractionMode: {
                type: String,
                notify: true,
                observer: '_canvasInteractionModeChanged'
            },

            ideMode: {
                type: String,
                notify: true,
                observer: '_ideModeChanged'
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

        _ideModeChanged: function (ideMode, oldEditionMode) {
            if (ideMode === IDE_MODES.navigation) {
                Polymer.Base.toggleClass('disabled', true, this.$['floating-box']);

            } else {

                Polymer.Base.toggleClass('disabled', false, this.$['floating-box']);
                // this.setSectionState('floating-box', 'open');
            }
        },

        // TODO: this is a very bad implementation
        activateFloatingBox: function () {
            this.set('ideMode', IDE_MODES.graphicalEdition);
        }
    });

})();
