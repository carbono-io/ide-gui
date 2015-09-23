'use strict';

/**
 * Deals with canvas-context elements
 * and clicking them.
 *
 * All overlay behaviors are defined here.
 */

// internal dependencies
var CONSTANTS = require('../constants');

/**
 * A set of declared properties specific to the canvas-context behavior
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
    }
};

/**
 * Event listeners specific to the canvas-context behavior
 * @type {Object}
 */
exports.listeners = {
    'overlay.mousemove': 'handleOverlayMousemove',    
    'overlay.click': 'handleOverlayClick',

    'overlay.mousewheel': 'handleOverlayMousewheel',
    'overlay.DOMMouseScroll': 'handleOverlayMousewheel',
};

/**
 * Lifecycle callback for whenever the element is first created
 */
exports.created = function () {
    // add listener for canvas-inspector-ready event
    this.addEventListener(CONSTANTS.INSPECTOR_READY_EVENT, function () {

        this.setFocusPoint({ x: 0, y: 0 });
    }.bind(this));
};

/**
 * Activates the overlay
 */
exports.activateOverlay = function () {
    this.toggleClass('active', true, this.$.overlay);
};

/**
 * Deactivates the overlay
 */
exports.deactivateOverlay = function () {
    var overlay = this.$.overlay;
    
    // remove 'active' class from overlay
    this.toggleClass('active', false, overlay);
    
    // Unhighlight whatever is highlighted.
    this.executeInspectorOperation('unHighlight', ['hover']);
    this.executeInspectorOperation('unHighlight', ['focus']);

};

/**
 * Whenever the mouse moves on the overlay, highlight the
 * element at the point
 * @param  {Event} event 
 */
exports.handleOverlayMousemove = function (event) {
    var normalizedMousePos = this.normalizeMousePosition({
        x: event.clientX,
        y: event.clientY
    });

    // Highlight element
    this.executeInspectorOperation('highlightElementAtPoint', ['hover', normalizedMousePos]);

    // Check if mouse is over clicked highlighter.
    // If so, set mode to 'add'
    this.executeInspectorOperation('areFocusAndHoverTogether')
        .then(function (res) {
            if (res) {
                this.set('mode', 'add');
            } else {
                this.set('mode', 'inspect');
            }
        }.bind(this))
        .done();
};

/**
 * Handles click events on the overlay
 * 
 * @param  {Event} event
 */
exports.handleOverlayClick = function (event) {

    // Normalize mouse position
    var normalizedMousePos = this.normalizeMousePosition({
        x: event.clientX,
        y: event.clientY
    });

    // Check current mode
    var currentMode = this.mode;

    this.executeInspectorOperation('highlightElementAtPoint', ['focus', normalizedMousePos]);

    this.executeInspectorOperation('getActiveElementData', ['focus', normalizedMousePos])
        .then(function (focusedElementData) {

            // DEPRECATE
            this.context.set('contextElement', focusedElementData);

            // set the focusedElementData
            this.set('focusedElementData', focusedElementData);

            this.components.body.openBox();
        }.bind(this))
        .done();
};


/**
 * Handles mousewheel events on the overlay layer.
 * Basically makes the scroll on the overlay
 * become the scroll within the iframe.
 * 
 * @param  {Event} event
 */
exports.handleOverlayMousewheel = function (event) {
    // Prevent event from being captured by outer nodes
    // (I am looking at you, window)
    event.preventDefault();
    event.stopPropagation();

    // Let the iframe scroll the same as the mousewheel
    this.executeInspectorOperation('scrollBy', [-1 * event.wheelDeltaX, -1 * event.wheelDeltaY]);

    // Normalize the mouse position from clientX and clientY
    // to overlayX and overlayY
    var normalizedMousePos = this.normalizeMousePosition({
        x: event.clientX,
        y: event.clientY
    });

    // Highlight element under the normalized mouse position
    // Force the highlight to ensure the highlighter moves even
    // if the highlighted element is still the same.
    this.executeInspectorOperation('highlightElementAtPoint', ['hover', normalizedMousePos, true]);
};

/**
 * Normalizes the mouse position by eliminating the 
 * distance of the overlay from top and left of the client window.
 * @param  {{x: Number, y: Number} Object} pos Original position
 * @return {{x: Numver, y: Number} Object} pos Normalized position
 */
exports.normalizeMousePosition = function (pos) {
    // Calculate the rect of the overlay
    var overlayRect = this.$.overlay.getBoundingClientRect();
    
    // Calculate the position of the mouse
    // relative to the rect of the overlay
    var normalized =  {
        x: pos.x - overlayRect.left,
        y: pos.y - overlayRect.top
    };

    return normalized;
};
