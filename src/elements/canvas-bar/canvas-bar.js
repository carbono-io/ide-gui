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
            }
        },

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

        /**
         * Sets the canvas mode to a given mode
         */
        setMode: function (ideMode) {
            console.log('carbo-canvas-bar setting ideMode to ' + ideMode);
            this.set('ideMode', ideMode);
        },
    });

})();
