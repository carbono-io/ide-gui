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
            border: '3px dashed green'
        }
    };
    var hoverHltPromise = this.executeInspectorOperation('createHighlighter', [hover]);

    var focus = {
        id: FOCUS_ID,
        surfaceStyle: {
            border: '3px solid green'
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

///////////
// HOVER //
///////////

/**
 * Sets the hover highlighter to a point
 */
exports.hoverElementAtPoint = function (point) {
    return this.executeInspectorOperation('highlightElementAtPoint', [HOVER_ID, point])
        .then(function () {
            return this.executeInspectorOperation('getHighlighterTargetData', [HOVER_ID]);
        }.bind(this));
};

exports.hideHover = function () {
    return this.executeInspectorOperation('unHighlight', [HOVER_ID]);
};

///////////
// HOVER //
///////////

///////////
// FOCUS //
///////////

/**
 * Sets the focus highlighter to a point
 */
exports.focusElementAtPoint = function (point) {
    return this.executeInspectorOperation('highlightElementAtPoint', [FOCUS_ID, point])
        .then(function () {
            return this.executeInspectorOperation('getHighlighterTargetData', [FOCUS_ID]);
        }.bind(this))
        .then(function (focusedElementData) {
            // add some meta data to the focusedElementData
            // the point at which the focus was activated
            focusedElementData._point = point;

            // set the focusedElementData
            this.set('focusedElementData', focusedElementData);

            return focusedElementData;
        }.bind(this));
};

/**
 * Sets the focus highlighter to a selector and returns data o the 
 * focused element.
 * @param  {String} selector CSS selector
 * @return {POJO}
 */
exports.focusElementForSelector = function (selector, options) {
    options = options || {};

    return this.executeInspectorOperation('highlightElementForSelector', [FOCUS_ID, selector])
        .then(function () {
            return this.executeInspectorOperation('getHighlighterTargetData', [FOCUS_ID]);
        }.bind(this))
        .then(function (focusedElementData) {
            // add some meta data to the focusedElementData
            // the selector at which the focus was activated
            focusedElementData._selector = selector;

            // set the focusedElementData
            this.set('focusedElementData', focusedElementData);

            return focusedElementData;
        }.bind(this));
};

exports.hideFocus = function () {
    return this.executeInspectorOperation('unHighlight', [FOCUS_ID]);
};

///////////
// FOCUS //
///////////


exports.areFocusAndHoverTogether = function () {

    var focusedElementData = this.executeInspectorOperation('getHighlighterTargetData', [FOCUS_ID]);
    var hoveredElementData = this.executeInspectorOperation('getHighlighterTargetData', [HOVER_ID])

    return Q.all([focusedElementData, hoveredElementData])
        .then(function (results) {
            return results[0].attributes['x-path'] === results[1].attributes['x-path'];
        });

}
