Polymer({
    is: 'carbo-canvas',
    
    ready: function () {
        
        // Bind theese methods to this object
        // because we need to add and remove them as eventHandlers
        this.handleOverlayKeydown = this.handleOverlayKeydown.bind(this);
        this.handleOverlayKeyup = this.handleOverlayKeyup.bind(this);
    },
    
    
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
        var overlayRect = this.$.overlay.getBoundingClientRect();
        
        var normalizedMousePos = {
            x: event.clientX - overlayRect.left,
            y: event.clientY - overlayRect.top
        };
        
        this.executeInspectorOperation('highlightElementAtPoint', normalizedMousePos);
    },
    
    handleCanvasMouseenter: function (event) {
        console.log('Overlay mouse entered');
        
        // set focus onto the overlay
        this.$.overlay.focus();
        this.$.overlay.addEventListener('keydown', this.handleOverlayKeydown);
    },
    
    handleCanvasMouseleave: function (event) {
        console.log('Overlay mouse left')
           
        // unfocus the overlay
        this.$.overlay.blur();
        
        // unHighlight
        this.executeInspectorOperation('unHighlight');
        
        // activate overlay
        this.activateOverlay();
    },
    
    handleOverlayKeydown: function (event) {
        console.log('keydown event on Overlay');
        
        // DOM lvl3 event.key is not supported by all browsers 
        // but MDN recommends using it instead of keyCode
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        if (event.key && event.key === 'a') {
            
            this.deactivateOverlay();
            
        } else if (event.keyCode && event.keyCode === 65) {
            // keyCodes:
            // https://css-tricks.com/snippets/javascript/javascript-keycodes/
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