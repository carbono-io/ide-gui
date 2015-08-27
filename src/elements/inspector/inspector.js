(function () {

    Polymer({
        is: 'carbo-inspector',
        ready: function () {


            document.addEventListener('mousemove', this.handleMousemove.bind(this));


            document.addEventListener('mouseout', function (e) {

                var from = e.relatedTarget || e.toElement;
                if (!from || from.nodeName == "HTML") {
                    this.unHighlight();
                }
            }.bind(this));

//            document.addEventListener('mouseenter', function (e) {
//
//                var from = e.relatedTarget || e.toElement;
//                if (!from || from.nodeName == "HTML") {
//                    this.unHighlight();
//                }
//            }.bind(this));



        },

        handleMousemove: function (event) {

            // Position of mouse
            var pos = {
                x: event.clientX,
                y: event.clientY
            };

            // get hovered component (Element under that position)
            var element = document.elementFromPoint(pos.x, pos.y);

            console.log(element.id);

            if (element === this) {
                return;
            }

            // salva a div highlighter numa variável
            var highlighter = this.$.highlighter;
//            console.log(highlighter);

            //
            if (this.activeElement) {
                this.unHighlight(this.activeElement);
            }

            // faz a função highlight no elemento que ele guardou na variavel 'element'
            this.highlight(element, highlighter);

            // 'ativa' o elemento que ele guardou na variavel 'element': Returns the currently focused element, that is, the element that will get keystroke events if the user types any. This attribute is read only.
            // Set active element
            this.activeElement = element;
        },

        highlight: function (element, highlighter) {
            // if (this.activeElement === element) {
            //     return;
            // }

//            console.log('highlight');
//            console.log(element)

//            element.style.border = '4px red dashed';


            this.toggleClass('show', true, this.$.highlighter);

//            // get element's size dynamically
//            var elementWidth = element.offsetWidth;
//            var elementHeight = element.offsetHeight;
//
//
//            // get left-position of element
//            var elementLeftPosition = element.offsetLeft;
//            // get height-position of element
//            var elementTopPosition = element.offsetTop;


            var rect = element.getBoundingClientRect();

            highlighter.style.left = rect.left + "px";
            highlighter.style.top = rect.top + "px";

            highlighter.style.width = rect.width + "px";
            highlighter.style.height = rect.height + "px";

            console.log(rect.left);

        },

        unHighlight: function (element) {
//            element.style.border = 'none';
              this.toggleClass('show', false, this.$.highlighter);


        },
    })

})();
