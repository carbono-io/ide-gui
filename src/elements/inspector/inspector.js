(function () {

    Polymer({
        is: 'carbo-inspector',
        ready: function () {
            

            //?mudou para window - window inclui a overlay - certo?
            window.addEventListener('message', this.handleFrameMessage.bind(this), false);

//            document.addEventListener('mousemove', this.handleMousemove.bind(this));


            //nao entendi exatamente essa parte
            document.addEventListener('mouseout', function (e) {
                var from = e.relatedTarget || e.toElement;
                if (!from || from.nodeName == "HTML") {
                    this.unHighlight();
                }
            }.bind(this));

        },
        
        //
        handleFrameMessage: function (event) {

// mensagem original
//            message = '{name: luciana}'

// mensagem  convertida em json
//            var message = {
//                name: 'luciana'
//            };
//
            
            //método JSON.parse() converte string para JSON
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

            this.highlightElementAtPoint(pos);

        },


        handleClick: function (event) {

            console.log('clicou');

        },


        // *****end handlemousemove

        highlight: function (element) {
            
            if (this.activeElement) {
                this.unHighlight(this.activeElement);
            }

            // 'ativa' o elemento que ele guardou na variavel 'element': Returns the currently focused element, that is, the element that will get keystroke events if the user types any. This attribute is read only.
            // Set active element
            this.activeElement = element;
            
            var highlighter = this.$.highlighter;
            
            this.toggleClass('show', true, highlighter);
//            this.toggleClass('show', true, this.$.clickarea);

            var rect = element.getBoundingClientRect();

            highlighter.style.left = rect.left + "px";
            highlighter.style.top = rect.top + "px";

            highlighter.style.width = rect.width + "px";
            highlighter.style.height = rect.height + "px";
        },
        // *****end highlight

        unHighlight: function () {
            this.toggleClass('show', false, this.$.highlighter);
        },
        //*****end unhighlight
        
        highlightElementAtPoint: function (point) {
            // get hovered component (Element under that position)
            var element = document.elementFromPoint(point.x, point.y);
            
            if (element === this) {
                this.unHighlight();
            }
            
            this.highlight(element);
        },
        
        
        scrollBy: function (deltaX, deltaY) {
            
//            console.log('scroll x: %s, y: %s', deltaX, deltaY);
            window.scrollBy(deltaX, deltaY);
            
            this.unHighlight();
        }
    })

})();




//--------------------------------------
