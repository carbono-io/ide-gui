'use strict';

/**
 * Communication with carbo-inspector is done here.
 * This lightweight wrapper used the frame-messaging behavior for communication.
 */

// external dependencies
var Q = require('q');

// internal dependencies
var CONSTANTS = require('../constants');

// constants
var HOVER_ID = 'canvas_hover';
var FOCUS_ID = 'canvas_focus';

/**
 * Lifecycle callback for whenever the element has been created
 *
 * We'll start listening for events here
 */
exports.created = function () {

    // Add listener for canvas-iframe-load event
    this.addEventListener(CONSTANTS.IFRAME_LOAD_EVENT, this.handleCanvasLoad.bind(this));
};

/**
 * Handles 'canvas-iframe-load' events (fired whenever the iframe is loaded
 * with the application inside it)
 */
exports.handleCanvasLoad = function () {
    // instantiate highlighters
    var hover = {
        id: HOVER_ID,
        surfaceStyle: {
            border: '3px red solid',
        },
    };
    var hoverHltPromise = this.executeInspectorOperation('createHighlighter', [hover]);

    var focus = {
        id: FOCUS_ID,
        surfaceStyle: {
            border: '3px navy solid'
        }
    };
    var focusHltPromise = this.executeInspectorOperation('createHighlighter', [focus]);

    // Wait for both highlighters to be created before
    // firing event of 'inspector-ready'
    Q.all([hoverHltPromise, focusHltPromise])
        .then(function () {

            this.fire(CONSTANTS.INSPECTOR_READY_EVENT);

        }.bind(this));
};

/**
 * Sets the hover highlighter to a point
 */
exports.setHoverPoint = function (point) {
    this.executeInspectorOperation('highlightElementAtPoint', [HOVER_ID, point]);
};

/**
 * Sets the focus highlighter to a point
 */
exports.setFocusPoint = function (point) {
    this.executeInspectorOperation('highlightElementAtPoint', [FOCUS_ID, point]);
};
