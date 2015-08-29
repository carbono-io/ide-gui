(function () {

    Polymer({
        is: 'carbo-canvas',
        
        /**
         * Called whenever the component is ready.
         * This function binds two event handlers to the instance.
         *
         * TODO: move to another hook, more appropriate for method binding.
         */
        ready: function () {
            
            // Bind theese methods to this object
            // because we need to add and remove them as eventHandlers
            this.handleOverlayKeydown = this.handleOverlayKeydown.bind(this);
            this.handleOverlayKeyup = this.handleOverlayKeyup.bind(this);
        },
        
        /**
         * Sets up the event listeners.
         */
        listeners: {
            'canvas.mouseenter': 'handleCanvasMouseenter',
            'canvas.mouseleave': 'handleCanvasMouseleave',
            
            'overlay.mousemove': 'handleOverlayMousemove',
            'overlay.mousewheel': 'handleOverlayMousewheel',
        },
        
        handleOverlayMousewheel: function (event) {
            this.executeInspectorOperation('scrollBy', [-1 * event.wheelDeltaX, -1 * event.wheelDeltaY]);
        },
        
        handleOverlayMousemove: function (event) {
            // Calculate the rect of the overlay
            var overlayRect = this.$.overlay.getBoundingClientRect();
            
            // Calculate the position of the mouse
            // relative to the rect of the overlay
            var normalizedMousePos = {
                x: event.clientX - overlayRect.left,
                y: event.clientY - overlayRect.top
            };
            
            // Highlight element
            this.executeInspectorOperation('highlightElementAtPoint', normalizedMousePos);
        },
        
        handleCanvasMouseenter: function (event) {
            
            // Set focus onto the overlay so that it can handle keydown events
            this.$.overlay.focus();
            this.$.overlay.addEventListener('keydown', this.handleOverlayKeydown);
        },
        
        handleCanvasMouseleave: function (event) {
               
            // unfocus the overlay
            this.$.overlay.blur();
            
            // unHighlight
            this.executeInspectorOperation('unHighlight');
            
            // activate overlay
            this.activateOverlay();
        },
        
        handleOverlayKeydown: function (event) {
            
            // DOM lvl3 event.key is not supported by all browsers 
            // but MDN recommends using it instead of keyCode
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            var condition1 = (event.key && event.key === 'a');
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
        
        handleOverlayKeyup: function (event) {
            console.log('keyup event on overlay');
            
            var overlay = this.$.overlay;
            overlay.addEventListener('keydown', this.handleOverlayKeydown);
            overlay.removeEventListener('keyup', this.handleOverlayKeyup);
            this.activateOverlay();
        },
        
        executeInspectorOperation: function (operation, args) {
            
            var message = JSON.stringify({
                operation: operation,
                args: Array.isArray(args) ? args : [args]
            });
            
            this.$.iframe.contentWindow.postMessage(message, '*');
        },
        
        activateOverlay: function () {
            this.toggleClass('active', true, this.$.overlay);
        },
        
        deactivateOverlay: function () {
            var overlay = this.$.overlay;
            
            // remove 'active' class from overlay
            this.toggleClass('active', false, overlay);
            
            // inspect
            this.executeInspectorOperation('unHighlight');
        }
    });

})();