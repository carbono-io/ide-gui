'use strict';

/**
 * Communication with carbo-inspector is done here.
 * This lightweight wrapper used the frame-messaging behavior for communication.
 */

var CONSTANTS = require('../constants');

/**
 * Auxiliary function that performs validation of iframe src url
 * @param  {String|Null|Undefined}  srcUrl The url to be checked
 * @return {Boolean}     [description]
 */
function _isValidIframeSrcUrl(srcUrl) {
    return (srcUrl !== null && srcUrl !== '' && srcUrl !== undefined);
}

/**
 * Event listeners
 * @type {Object}
 */
exports.listeners = {
    'iframe.load': 'handleIframeLoad',
};

/**
 * Lifecycle callback for whenever the element has been created
 *
 * We'll start listening for events here
 */
exports.created = function () {

};

/**
 * Handles 'load' events from the iframe
 */
exports.handleIframeLoad = function (event) {
    var iframe = this.$.iframe;

    var iframeSrcUrl = iframe.getAttribute('src');


    // Check if the load event was fired for a valid src
    // If so, fire an 'canvas-load' event on the canvas object
    // This check is performed because the iframe fires a load event
    // even with a Null src attribute
    if (_isValidIframeSrcUrl(iframeSrcUrl)) {
        this.fire(CONSTANTS.IFRAME_LOAD_EVENT);
    }
};