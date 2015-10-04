'use strict';

var CONSTANTS = require('../constants');

/**
 * Defines variables that are made available through the global scope
 */
module.exports = function (carbo, config) {

    /**
     * The edition mode 
     */
    carbo.set('ideMode', CONSTANTS.ideModes.graphicalEdition);

    /**
     * The current active view
     */
    carbo.set('focusedViewData', false);

    /**
     * The current focused element data
     */
    carbo.set('focusedElementData', false);

    /**
     * The current hovered element data
     */
    carbo.set('hoveredElementData', false);

    /**
     * The current active element tree data
     */
    carbo.set('activeElementTreeData', false);

    /**
     * The canvas interaction mode
     */
    carbo.set('canvasInteractionMode', CONSTANTS.canvasInteractionModes.inspection);
};
