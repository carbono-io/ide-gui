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

            // ideMode: {
            //     type: String,
            //     notify: true,
            //     observer: '_ideModeChanged'
            // }
        },

        ready: function () {
            this.set('sectionStates', {});

            this.openLeftPanel();
            this.openCanvas();
            this.closeCanvasPanel();
            this.openRightPanel();

            this.setSectionState('middle-bar', 'open');
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

        getSectionState: function (sectionName) {
            return this.get('sectionStates')[sectionName];
        },

        openLeftPanel: function () {
            this.setSectionState('left', 'open');
        },

        openCanvas: function () {
            this.setSectionState('canvas-container', 'open');
        },

        openCanvasPanel: function () {
            this.setSectionState('canvas-panel', 'open');

            this.fire('change-sections-layout', {
                canvasPanel: 'open',
            });
        },

        closeCanvasPanel: function () {
            this.setSectionState('canvas-panel', 'closed');

            this.fire('change-sections-layout', {
                canvasPanel: 'closed',
            });
        },

        openRightPanel: function () {
            this.setSectionState('right', 'open');
        },


        // _canvasInteractionModeChanged: function (interactionMode, oldInteractionMode) {
        //     // if (interactionMode === 'insertion') {
        //     //     this.
        //     // }
        // },

        // _ideModeChanged: function (ideMode, oldEditionMode) {
        //     if (ideMode === IDE_MODES.navigation) {
        //         Polymer.Base.toggleClass('disabled', true, this.$['canvas-panel']);

        //     } else {

        //         Polymer.Base.toggleClass('disabled', false, this.$['canvas-panel']);
        //         // this.setSectionState('canvas-panel', 'open');
        //     }
        // },

        // // TODO: this is a very bad implementation
        // activateFloatingBox: function () {
        //     this.set('ideMode', IDE_MODES.graphicalEdition);
        // }
    });

})();
