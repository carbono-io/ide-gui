'use strict';

/* globals _, Q */
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
 * and that should be shared with the external world
 * @type {Object}
 */
exports.properties = {

    interactionMode: {
        type: String,
        notify: true,
        value: CONSTANTS.canvasInteractionModes.inspection,
        observer: '_interactionModeChanged',
    },

    /**
     * The editionMode at which the canvas is
     */
    ideMode: {
        type: String,
        notify: true,
        value: CONSTANTS.ideModes.graphicalEdition,
        observer: '_ideModeChanged',
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
    this.addEventListener(
        CONSTANTS.INSPECTOR_READY_EVENT,
        this._highlightLastFocusedElement.bind(this)
    );
};

/**
 * Handles changes in the 'editionMode' property
 */
exports._ideModeChanged = function (ideMode, oldIdeMode) {

    if (ideMode === CONSTANTS.ideModes.navigation) {
        // navigation ideMode, let overlay fade
        this.deactivateOverlay();
    } else if (
        ideMode === CONSTANTS.ideModes.graphicalEdition ||
        ideMode === CONSTANTS.ideModes.codeEdition) {
        // edition
        this.activateOverlay();
    } else {
        // default behaviour
        this.activateOverlay();
    }
};

exports._interactionModeChanged = function (interactionMode, oldInteractionMode) {

    var insertionMode = (interactionMode === CONSTANTS.canvasInteractionModes.insertion);

    Polymer.Base.toggleClass(
        'insert-interaction',
        insertionMode,
        this.$.overlay
    );
};

/**
 * Highlights the current focused element
 */
exports._highlightLastFocusedElement = function () {
    // read focusedElementData
    var focus = this.get('focusedElementData');

    if (focus) {

        var selector = '[carbono-uuid="' + focus.attributes['carbono-uuid'] + '"]';

        this.focusElementForSelector(selector);
    } else {
        // no focus
        // TODO: hard-coded
        this.focusElementForSelector('body', {
            // TODO: implement silent focus
            silent: true
        });
    }
};

/**
 * Activates the overlay
 */
exports.activateOverlay = function () {
    this.toggleClass('active', true, this.$.overlay);

    // highlight the last focused element.
    this._highlightLastFocusedElement();
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
                this.set('interactionMode', CONSTANTS.canvasInteractionModes.insertion);
            } else {
                this.set('interactionMode', CONSTANTS.canvasInteractionModes.inspection);
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

            this.set('interactionMode', CONSTANTS.canvasInteractionModes.insertion);

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

    event.stopPropagation();
    event.preventDefault();

    // remove 'active' class from overlay
    this.$.overlay.style.display = 'none';

    _.delay(function(){
        this.$.overlay.style.display = 'block';
        this.executeInspectorOperation('scrollBy', [event.wheelDeltaX * -0.4, event.wheelDeltaY* -0.4]);
    }.bind(this), 1 );

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
