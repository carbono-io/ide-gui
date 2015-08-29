(function () {

    Polymer({
        is: 'carbo-inspector',
        ready: function () {
            window.addEventListener('message', this.handleFrameMessage.bind(this));
        },
        
        handleFrameMessage: function (event) {
            var data = JSON.parse(event.data);
            
            var operationName = data.operation;
            var args          = data.args || [];
            
            var operation = this[operationName];
            
            if (operation) {
                operation.apply(this, args);
            } else {
                console.warn('Operation %s not defined at inspector', operationName);
            }
        },

        handleMousemove: function (event) {
            // Position of mouse
            var pos = {
                x: event.clientX,
                y: event.clientY
            };

            // faz a função highlight no elemento que ele guardou na variavel 'element'
            this.highlightElementAtPoint(pos);
        },

        highlight: function (element) {
            if (this.activeElement) {
                this.unHighlight(this.activeElement);
            }

            // 'ativa' o elemento que ele guardou na variavel 'element': Returns the currently focused element, that is, the element that will get keystroke events if the user types any. This attribute is read only.
            // Set active element
            this.activeElement = element;
            
            var highlighter = this.$.highlighter;
            
            this.toggleClass('show', true, highlighter);

            var rect = element.getBoundingClientRect();

            highlighter.style.left = rect.left + "px";
            highlighter.style.top = rect.top + "px";

            highlighter.style.width = rect.width + "px";
            highlighter.style.height = rect.height + "px";
        },

        unHighlight: function () {
            this.toggleClass('show', false, this.$.highlighter);
        },
        
        highlightElementAtPoint: function (point) {
            // get hovered component (Element under that position)
            var element = document.elementFromPoint(point.x, point.y);
            
            if (element === this) {
                this.unHighlight();
            }
            
            this.highlight(element);
        },
        
        scrollBy: function (deltaX, deltaY) {
            // console.log('scroll x: %s, y: %s', deltaX, deltaY);
            window.scrollBy(deltaX, deltaY);
            
            this.unHighlight();
        }
    })

})();