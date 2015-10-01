'use strict';

(function () {

    // MODES
    var CONSTANTS = {};
    CONSTANTS.editionModes = {
        graphicalEdition: 'graphical-edition',
        codeEdition: 'code-edition',
        navigation: 'navigation'
    };

    Polymer({
        is: "carbo-canvas-bar",
        properties: {
            editionMode: {
                type: String,
                value: CONSTANTS.editionModes.graphicalEdition,
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

            listener.simple_combo('shift g', this.setMode.bind(this, CONSTANTS.editionModes.graphicalEdition));
            listener.simple_combo('shift c', this.setMode.bind(this, CONSTANTS.editionModes.codeEdition));
            listener.simple_combo('shift n', this.setMode.bind(this, CONSTANTS.editionModes.navigation));
        },

        /**
         * Sets the canvas mode to a given mode
         */
        setMode: function (editionMode) {
            console.log('carbo-canvas-bar setting editionMode to ' + editionMode);
            this.set('editionMode', editionMode);
        },
    });

})();
