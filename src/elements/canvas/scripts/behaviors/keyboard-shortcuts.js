'use strict';

/**
 * Defines all methods and events required for keyboard shortcuts.
 */

/**
 * Called whenever the component is instantiated.
 * See https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html
 */
exports.created = function () {
    
    // Bind theese methods to this object
    // because we need to add and remove them as eventHandlers
    this.handleOverlayKeydown = this.handleOverlayKeydown.bind(this);
    this.handleOverlayKeyup = this.handleOverlayKeyup.bind(this);
};

/**
 * Handles `keydown` events on the overlay
 * @param  {Event} event 
 */
exports.handleOverlayKeydown = function (event) {
    // DOM lvl3 event.key is not supported by all browsers 
    // but MDN recommends using it instead of keyCode
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    var condition1 = (event.key && event.key === OVERLAY_DEACTIVATE_KEY);
    var condition2 = (event.keyCode && event.keyCode === 65);
    // keyCodes:
    // https://css-tricks.com/snippets/javascript/javascript-keycodes/
    if (condition1 || condition2) {
        this.deactivateOverlay();   
    }
    
    var overlay = this.$.overlay;
    overlay.removeEventListener('keydown', this.handleOverlayKeydown);
    overlay.addEventListener('keyup', this.handleOverlayKeyup);
};

/**
 * Handles keyup events on the overlay
 * This handler basically stops the overlay from handling keyboard
 * shortcuts.
 * @param  {Event} event
 */
exports.handleOverlayKeyup = function (event) {
    var overlay = this.$.overlay;
    overlay.addEventListener('keydown', this.handleOverlayKeydown);
    overlay.removeEventListener('keyup', this.handleOverlayKeyup);
    this.activateOverlay();
};
