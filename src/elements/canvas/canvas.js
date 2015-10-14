'use strict';

/**
 * Before reading the code, it will be helpful to contextualize
 * yourself at what this module does.
 *
 * In essence, it is the guy responsible for all interactions with the
 * application frame within it.
 *
 * There are multiple events that we must intercept at this module:
 * the clicks on the application, scroll, mousemove.
 *
 * All these events are intercepted by a sub-component we call the
 * `overlay`, which is an opacity-0-div that is over the application iframe.
 *
 * All events are detected on the overlay and passed onto the application if
 * necessary.
 */
(function () {

    // Load behaviors
    var IframeBehavior         = require('./scripts/behaviors/iframe');
    var FrameMessagingBehavior = require('./scripts/behaviors/frame-messaging');
    var InspectorBehavior      = require('./scripts/behaviors/inspector');
    var OverlayBehavior        = require('./scripts/behaviors/overlay');
    var CodeMachineBehavior    = require('./scripts/behaviors/code-machine');
    var SpotligtherBehavior    = require('./scripts/behaviors/spotlighter');

    // Load constants
    var CONSTANTS = require('./scripts/constants');

    /**
     * The char that deactivates the overlay.
     * @type {String}
     */
    var OVERLAY_DEACTIVATE_KEY = 'a';

    Polymer({
        is: 'carbo-canvas',

        behaviors: [
            IframeBehavior,
            FrameMessagingBehavior,
            InspectorBehavior,
            OverlayBehavior,
            CodeMachineBehavior,
            SpotligtherBehavior
        ],

        properties: {

            components: {
                type: Object,
                notify: true
            },

            context: {
                type: Object,
                notify: true
            }
        },

        /**
         * Hash of event listeners for the DOM
         */
        listeners: {
            'canvas.mouseenter': 'handleCanvasMouseenter',
            'canvas.mouseleave': 'handleCanvasMouseleave',
        },

        activateLoading: function () {
            this.executeInspectorOperation('activateLoading');
        },

        deactivateLoading: function () {
            this.executeInspectorOperation('deactivateLoading');
        },

        
        /**
         * Whenever the mouse enters the canva element area,
         * let the overlay handle keydown events for shortcut detection.
         */
        handleCanvasMouseenter: function (event) {
            // Set focus onto the overlay so that it can handle keydown events
            this.$.overlay.focus();
            this.$.overlay.addEventListener('keydown', this.handleOverlayKeydown);
        },

        /**
         * Whenever the mouse leaves the canvas,
         * make sure the overlay is activated and the inspector unhighlighted.
         */
        handleCanvasMouseleave: function (event) {

            // unfocus the overlay
            this.$.overlay.blur();

            // unHighlight
            this.hideHover();

            // activate overlay
            // this.activateOverlay();
        },

        /**
         * Reloads the iframe
         *
         * See second response:
         * http://stackoverflow.com/questions/86428/whats-the-best-way-to-reload-refresh-an-iframe-using-javascript
         */
        reload: function () {

            var defer = Q.defer();

            var iframe = this.$.iframe;

            iframe.src = iframe.src;

            // event handler for inspector ready
            function handleReloadFinished() {
                // resolve deferred object
                defer.resolve();

                // remove listener
                this.removeEventListener(CONSTANTS.INSPECTOR_READY_EVENT, handleReloadFinished);
            }

            this.addEventListener(CONSTANTS.INSPECTOR_READY_EVENT, handleReloadFinished);

            // return a promise for whenever the reloading is done
            return defer.promise;
        }
    });

})();
