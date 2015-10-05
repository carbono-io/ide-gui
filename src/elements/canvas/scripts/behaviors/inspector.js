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

/**
 * Properties that define communication with external world
 * @type {Object}
 */
exports.properties = {

    /**
     * The element currently focused
     * @type {Object}
     */
    focusedElementData: {
        type: Object,
        notify: true,
    },

    /**
     * The element currently hovered
     * @type {Object}
     */
    hoveredElementData: {
        type: Object,
        notify: true
    },

    /**
     * The current active element tree
     * @type {Object}
     */
    activeElementTreeData: {
        type: Object,
        notify: true
    }
};

/**
 * Lifecycle callback for whenever the element has been created
 *
 * We'll start listening for events here
 */
exports.created = function () {

    // Add listener for canvas-iframe-load event
    this.addEventListener(
        CONSTANTS.IFRAME_LOAD_EVENT,
        this.handleCanvasLoad.bind(this)
    );
};

/**
 * Define all inspector methods
 */
var INSPECTOR_METHODS = [
    'createHighlighter',

    'highlightElementAtPoint',
    'highlightElementForSelector',
    'hideHighlighter',
    'showHighlighter',
    'getHighlighterTargetData',
    'getHighlighterTargetChildrenData',
    'getElementsData',
    'getElementTreeData',
    'elementMatches',

    'applyStyle',
];

INSPECTOR_METHODS.forEach(function (methodName) {
    exports[methodName] = function () {
        var args = Array.prototype.slice.call(arguments, 0);

        return this.executeInspectorOperation(methodName, args);
    };
});

// list of highlighters to be created
var HOVER_ID     = 'canvas_hover';
var FOCUS_ID     = 'canvas_focus';
var INSERTION_ID = 'canvas_insertion_focus';
var HIGHLIGHTERS = [
    {
        id: HOVER_ID,
        surfaceStyle: {
            border: '3px dashed green'
        }
    },
    {
        id: FOCUS_ID,
        surfaceStyle: {
            border: '3px solid green'
        }
    }
];

/**
 * Handles 'canvas-iframe-load' events (fired whenever the iframe is loaded
 * with the application inside it)
 */
exports.handleCanvasLoad = function () {
    // instantiate highlighters
    var highlightersPromise = HIGHLIGHTERS.map(this.createHighlighter.bind(this));

    // Wait for both highlighters to be created before
    // firing event of 'inspector-ready'
    Q.all(highlightersPromise)
        .then(function () {
            this.fire(CONSTANTS.INSPECTOR_READY_EVENT);
        }.bind(this))
        .done();

    // get active element tree data ('body' for now)
    // TODO: make this dynamic
    this.getElementTreeData('body')
        .then(function (bodyTreeData) {
            this.set('activeElementTreeData', bodyTreeData);
        }.bind(this))
        .done();
};

///////////
// HOVER //
///////////

exports.hoverElementAtPoint = function (point) {
    this.highlightElementAtPoint(HOVER_ID, point)
        .then(function () {
            return this.getHighlighterTargetData(HOVER_ID);
        }.bind(this))
        .then(function (hoveredElementData) {
            _setElementData.call(this, 'hoveredElementData', hoveredElementData);

            return hoveredElementData;
        }.bind(this));
};
exports.hoverElementForSelector = function (selector) {
    this.highlightElementForSelector(HOVER_ID, selector)
        .then(function () {
            return this.getHighlighterTargetData(HOVER_ID);
        }.bind(this))
        .then(function (hoveredElementData) {
            _setElementData.call(this, 'hoveredElementData', hoveredElementData);

            return hoveredElementData;
        }.bind(this));
};
exports.hideHover = _.partial(exports.hideHighlighter, HOVER_ID);

///////////
// FOCUS //
///////////

/**
 * Sets the focus highlighter to a point
 */
exports.focusElementAtPoint = function (point) {
    return this.highlightElementAtPoint(FOCUS_ID, point)
        .then(function () {
            return this.getHighlighterTargetData(FOCUS_ID);
        }.bind(this))
        .then(function (focusedElementData) {

            _setElementData.call(this, 'focusedElementData', focusedElementData);

            return focusedElementData;
        }.bind(this));
};

/**
 * Sets the focus highlighter to a selector and returns data o the 
 * focused element.
 * @param  {String} selector CSS selector
 * @return {POJO}
 */
exports.focusElementForSelector = function (selector) {
    return this.highlightElementForSelector(FOCUS_ID, selector)
        .then(function () {
            return this.getHighlighterTargetData(FOCUS_ID);
        }.bind(this))
        .then(function (focusedElementData) {

            _setElementData.call(this, 'focusedElementData', focusedElementData);

            return focusedElementData;
        }.bind(this));
};

exports.hideFocus = function () {
    return this.hideHighlighter(FOCUS_ID);
};

/**
 * Focus inspection
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
 */
exports.getFocusTargetData = function () {
    return this.getHighlighterTargetData(FOCUS_ID);
};

exports.getFocusTargetChildrenData = function (selector) {
    return this.getHighlighterTargetChildrenData(FOCUS_ID, selector);
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

};

///////////////
// INSERTION //
///////////////
exports.setInsertionFocus = function (insertionContext) {

    console.warn('<carbo-canvas>.setInsertionFocus is deprecated');

    var focusedElementData = this.get('focusedElementData');

    // force insertionContext to be at least an empty string
    var insertionContextSelector = insertionContext[focusedElementData.tagName] || '';

    insertionContextSelector = '[carbono-uuid="' + focusedElementData.attributes['carbono-uuid'] + '"] ' + insertionContextSelector;

    return this.executeInspectorOperation('highlightElementForSelector', [INSERTION_ID, insertionContextSelector])
        .then(function () {
            return this.executeInspectorOperation('getHighlighterTargetData', [INSERTION_ID]);
        }.bind(this))
        .then(function (insertionElementData) {
            return insertionElementData;
        });
};

/**
 * Auxiliary function that sets the elementData
 *
 * It builds some meta data onto the original data object.
 * @param {Object} data  
 */
function _setElementData(prop, elementData) {

    // carbono-uuid selector
    elementData._uuidSelector = util.format(
        '[carbono-uuid="%s"]',
        elementData.attributes['carbono-uuid']
    );

    // set 
    this.set(prop, elementData);

    return elementData;
}
