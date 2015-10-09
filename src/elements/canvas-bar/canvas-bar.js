'use strict';

(function () {

    // MODES
    var CONSTANTS = {};
    CONSTANTS.ideModes = {
        graphicalEdition: 'graphical-edition',
        codeEdition: 'code-edition',
        navigation: 'navigation'
    };

    Polymer({
        is: "carbo-canvas-bar",
        properties: {
            ideMode: {
                type: String,
                value: CONSTANTS.ideModes.graphicalEdition,
                notify: true
            },

            /**
             * The body component
             * @type {Object}
             */
            body: {
                type: Object,
                notify: true,
                observer: '_handleBodyChange',
            }
        },


        animation:{ 
            "entry": [{"name": "fade-in-animation", "timing": {"delay": 0}}]
         },

        observers: [
            '_handleCanvasPanelStateChange(canvasPanelState)'
        ],

        /**
         * Function to be executed once the component is ready
         *
         * Set up event listeners for keyboard shortcuts
         * 
         * Shift+G: graphical-edition-editionMode
         * Shift+C: code-edition-editionMode
         * Shift+N: navigation-editionMode
         */
        created: function () {

            // use keypress
            var listener = new window.keypress.Listener();

            listener.simple_combo('shift g', this.setMode.bind(this, CONSTANTS.ideModes.graphicalEdition));
            listener.simple_combo('shift c', this.setMode.bind(this, CONSTANTS.ideModes.codeEdition));
            listener.simple_combo('shift n', this.setMode.bind(this, CONSTANTS.ideModes.navigation));
        },

        _handleBodyChange: function (body, old) {
            body.addEventListener('change-sections-layout', function (event) {
                this.set('canvasPanelState', event.detail.canvasPanel);
            }.bind(this));
        },

        /**
         * Sets the canvas mode to a given mode
         */
        setMode: function (ideMode) {
            console.log('carbo-canvas-bar setting ideMode to ' + ideMode);
            this.set('ideMode', ideMode);
        },

        /**
         * Toggles the open and close of canvasPanel
         */
        toggleCanvasPanel: function () {

            if (!this.body) {
                throw new Error('No body available for <carbo-canvas-bar>.toggleCanvasPanel');
            }

            if (this.get('canvasPanelState') === 'open') {
                this.body.closeCanvasPanel();
            } else {
                this.body.openCanvasPanel();
            }
        },

        /**
         * Handles changes on the canvasPanelState
         *
         * TODO: not good implementation yet.
         */
        _handleCanvasPanelStateChange: function (canvasPanelState) {

            var toggle = this.$['canvas-panel-toggle'];
            var isActive = (canvasPanelState === 'open');

            Polymer.Base.toggleClass('active', isActive, toggle);
        },
    });

})();
