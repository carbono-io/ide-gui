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
    },

    /**
     * The mode at which the canvas is
     */
    mode: {
        type: String,
        notify: true,
        value: 'inspect',
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

        // read focusedElementData
        var focus = this.get('focusedElementData');

        if (focus) {

            var selector = '[x-path="' + focus.attributes['x-path'] + '"]';

            this.focusElementForSelector(selector);
        } else {
            // no focus
            // TODO: hard-coded
            this.focusElementForSelector('body', {
                // TODO: implement silent focus
                silent: true
            });
        }

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
    this.hideHover();
    this.hideFocus();

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

    // check if hovered element is the same as the focused element
    this.areFocusAndHoverTogether()
        .then(function (areTogether) {
            
            if (areTogether) {
                this.set('mode', 'add');
            } else {
                this.set('mode', 'inspect');
            }

        }.bind(this))
        .done();

    // Highlight element
    this.hoverElementAtPoint(normalizedMousePos);
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

    // Set the focus to the element under the cursor
    this.focusElementAtPoint(normalizedMousePos)
        .then(function (focusedElementData) {

            this.set('mode', 'add');

            // DEPRECATE
            this.context.set('contextElement', focusedElementData);

        }.bind(this))
        // finish promise chain and throw errors
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
