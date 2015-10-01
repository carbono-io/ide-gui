'use strict';

/**
 * Communication with carbo-inspector is done here.
 * This lightweight wrapper used the frame-messaging behavior for communication.
 */

// native dependencies
var util = require('util');

// external dependencies
var Q = require('q');

// internal dependencies
var CONSTANTS = require('../constants');

// constants
var HOVER_ID     = 'canvas_hover';
var FOCUS_ID     = 'canvas_focus';
var INSERTION_ID = 'canvas_insertion_focus';

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

    var insertion = {
        id: INSERTION_ID,
        surfaceStyle: {
            border: 'none',
        }
    };
    var insertionHltPromise = this.executeInspectorOperation('createHighlighter', [insertion]);

    // Wait for both highlighters to be created before
    // firing event of 'inspector-ready'
    Q.all([hoverHltPromise, focusHltPromise, insertionHltPromise])
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
 * Auxiliary function that sets the focusedElementData property
 *
 * It builds some meta data onto the original data object.
 * @param {Object} data  
 */
function _setFocusedElementData(focusedElementData) {

    // carbono-uuid selector
    focusedElementData._uuidSelector = util.format(
        '[carbono-uuid="%s"]',
        focusedElementData.attributes['carbono-uuid']
    );

    // set 
    this.set('focusedElementData', focusedElementData);

    return focusedElementData;
}

/**
 * Sets the focus highlighter to a point
 */
exports.focusElementAtPoint = function (point) {
    return this.executeInspectorOperation('highlightElementAtPoint', [FOCUS_ID, point])
        .then(function () {
            return this.executeInspectorOperation('getHighlighterTargetData', [FOCUS_ID]);
        }.bind(this))
        .then(function (focusedElementData) {

            _setFocusedElementData.call(this, focusedElementData);

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
            
            _setFocusedElementData.call(this, focusedElementData);

            return focusedElementData;
        }.bind(this));
};

exports.hideFocus = function () {
    return this.executeInspectorOperation('unHighlight', [FOCUS_ID]);
};

///////////
// FOCUS //
///////////


// FOCUS AND HOVER //
exports.areFocusAndHoverTogether = function () {

    var focusedElementData = this.executeInspectorOperation('getHighlighterTargetData', [FOCUS_ID]);
    var hoveredElementData = this.executeInspectorOperation('getHighlighterTargetData', [HOVER_ID])

    return Q.all([focusedElementData, hoveredElementData])
        .then(function (results) {
            return results[0] && results[1] &&
                results[0].attributes['carbono-uuid'] === results[1].attributes['carbono-uuid'];
        });

}


///////////////
// INSERTION //
///////////////
exports.setInsertionFocus = function (insertionContext) {

    var focusedElementData = this.get('focusedElementData');

    // force insertionContext to be at least an empty string
    var insertionContextSelector = insertionContext[focusedElementData.tagName] || '';

    insertionContextSelector = '[carbono-uuid="' + focusedElementData.attributes['carbono-uuid'] + '"] ' + insertionContextSelector;

    console.log(insertionContext);

    return this.executeInspectorOperation('highlightElementForSelector', [INSERTION_ID, insertionContextSelector])
        .then(function () {
            return this.executeInspectorOperation('getHighlighterTargetData', [INSERTION_ID]);
        }.bind(this))
        .then(function (insertionElementData) {
            return insertionElementData;
        });
};
