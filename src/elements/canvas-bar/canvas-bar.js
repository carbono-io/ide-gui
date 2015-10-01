'use strict';

(function () {

    // MODES
    var CONSTANTS = {};
    CONSTANTS.modes = {
        graphicalEdition: 'graphical-edition',
        codeEdition: 'code-edition',
        navigation: 'navigation'
    };

    Polymer({
        is: "carbo-canvas-bar",
        properties: {
            mode: {
                type: String,
                value: CONSTANTS.modes.graphicalEdition,
                notify: true
            }
        },

        /**
         * Function to be executed once the component is ready
         *
         * Set up event listeners for keyboard shortcuts
         * 
         * Shift+G: graphical-edition-mode
         * Shift+C: code-edition-mode
         * Shift+N: navigation-mode
         */
        created: function () {

            // use keypress
            var listener = new window.keypress.Listener();

            listener.simple_combo('shift g', this.setMode.bind(this, CONSTANTS.modes.graphicalEdition));
            listener.simple_combo('shift c', this.setMode.bind(this, CONSTANTS.modes.codeEdition));
            listener.simple_combo('shift n', this.setMode.bind(this, CONSTANTS.modes.navigation));
        },

        /**
         * Sets the canvas mode to a given mode
         */
        setMode: function (mode) {
            console.log('carbo-canvas-bar setting mode to ' + mode);
            this.set('mode', mode);
        },
    });

})();
