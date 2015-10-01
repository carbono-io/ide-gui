'use strict';

/**
 * Defines constants used through the application
 */

var globalConstants = require('../../../scripts/constants');

exports.IFRAME_LOAD_EVENT     = 'canvas-iframe-load';
exports.INSPECTOR_READY_EVENT = 'canvas-inspector-ready';

// proxy globals
exports.ideModes = globalConstants.ideModes;
exports.canvasInteractionModes = globalConstants.canvasInteractionModes;
