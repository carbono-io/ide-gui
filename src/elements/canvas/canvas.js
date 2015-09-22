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
    var FrameMessagingBehavior = require('./scripts/behaviors/frame-messaging');

    /**
     * The char that deactivates the overlay.
     * @type {String}
     */
    var OVERLAY_DEACTIVATE_KEY = 'a';

    Polymer({
        is: 'carbo-canvas',

        behaviors: [FrameMessagingBehavior],
        
        /**
         * Called whenever the component is instantiated.
         * See https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html
         */
        created: function () {
            
            // Bind theese methods to this object
            // because we need to add and remove them as eventHandlers
            this.handleOverlayKeydown = this.handleOverlayKeydown.bind(this);
            this.handleOverlayKeyup = this.handleOverlayKeyup.bind(this);
        },

        properties: {
            mode: {
                type: String,
                notify: true,
                value: 'inspect'
            },

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
            
            'overlay.mousemove': 'handleOverlayMousemove',
            'overlay.mousewheel': 'handleOverlayMousewheel',
            'overlay.DOMMouseScroll': 'handleOverlayMousewheel',
            'overlay.click': 'handleOverlayClick',
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
            this.executeInspectorOperation('unHighlight', ['hover']);
            
            // activate overlay
            this.activateOverlay();
        },

        /**
         * Handles mousewheel events on the overlay layer.
         * Basically makes the scroll on the overlay
         * become the scroll within the iframe.
         * 
         * @param  {Event} event
         */
        handleOverlayMousewheel: function (event) {
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
        },
        
        /**
         * Whenever the mouse moves on the overlay, highlight the
         * element at the point
         * @param  {Event} event 
         */
        handleOverlayMousemove: function (event) {
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
        },

        /**
         * Handles click events on the overlay
         * 
         * @param  {Event} event
         */
        handleOverlayClick: function (event) {

            // Normalize mouse position
            var normalizedMousePos = this.normalizeMousePosition({
                x: event.clientX,
                y: event.clientY
            });

            // Check current mode
            var currentMode = this.mode;

            this.executeInspectorOperation('highlightElementAtPoint', ['focus', normalizedMousePos]);

            this.executeInspectorOperation('getActiveElementData', ['focus', normalizedMousePos])
                .then(function (activeElementData) {

                    this.context.set('contextElement', activeElementData);

                    console.log(activeElementData.attributes['x-path']);

                    this.components.body.openBox();
                }.bind(this))
                .done();
        },
        
        /**
         * Handles `keydown` events on the overlay
         * @param  {Event} event 
         */
        handleOverlayKeydown: function (event) {
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
        },
            
        /**
         * Handles keyup events on the overlay
         * This handler basically stops the overlay from handling keyboard
         * shortcuts.
         * @param  {Event} event
         */
        handleOverlayKeyup: function (event) {
            var overlay = this.$.overlay;
            overlay.addEventListener('keydown', this.handleOverlayKeydown);
            overlay.removeEventListener('keyup', this.handleOverlayKeyup);
            this.activateOverlay();
        },
        
        /**
         * Normalizes the mouse position by eliminating the 
         * distance of the overlay from top and left of the client window.
         * @param  {{x: Number, y: Number} Object} pos Original position
         * @return {{x: Numver, y: Number} Object} pos Normalized position
         */
        normalizeMousePosition: function (pos) {
            // Calculate the rect of the overlay
            var overlayRect = this.$.overlay.getBoundingClientRect();
            
            // Calculate the position of the mouse
            // relative to the rect of the overlay
            var normalized =  {
                x: pos.x - overlayRect.left,
                y: pos.y - overlayRect.top
            };

            return normalized;
        },

        /**
         * Activates the overlay
         */
        activateOverlay: function () {
            this.toggleClass('active', true, this.$.overlay);
        },
        
        /**
         * Deactivates the overlay
         */
        deactivateOverlay: function () {
            var overlay = this.$.overlay;
            
            // remove 'active' class from overlay
            this.toggleClass('active', false, overlay);
            
            // Unhighlight whatever is highlighted.
            this.executeInspectorOperation('unHighlight', ['hover']);
            this.executeInspectorOperation('unHighlight', ['focus']);

        },

        /**
         * Reloads the iframe
         *
         * See second response:
         * http://stackoverflow.com/questions/86428/whats-the-best-way-to-reload-refresh-an-iframe-using-javascript
         */
        reload: function () {

            var iframe = this.$.iframe;

            iframe.src = iframe.src;

            // Does not work across domains
            // this.$.iframe.contentWindow.location.reload();
        }
    });

})();
