(function () {

    Polymer({
        is: 'carbo-inspector',
        ready: function () {


            document.addEventListener('mousemove', this.handleMousemove.bind(this));

        },

        handleMousemove: function (event) {

            // Position of mouse
            var pos = {
                x: event.clientX,
                y: event.clientY
            };

            // get hovered component (Element under that position)
            var element = document.elementFromPoint(pos.x, pos.y);

            // salva a div highlighter numa variável
            var highlighter = this.$.highlighter;
//            console.log(highlighter);

            //?
            if (this.activeElement) {
                this.unHighlight(this.activeElement);
            }

            //? faz a função highlight no elemento que ele guardou na variavel 'element'
            this.highlight(element, highlighter);

            //? 'ativa' o elemento que ele guardou na variavel 'element': Returns the currently focused element, that is, the element that will get keystroke events if the user types any. This attribute is read only.
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

            //FAZER: ao invés de colocar um border no proprio component, colocar uma div por cima com transparência e border
//calcular o tamanho e posicao dessa div a partir do elemento - ex do preview da luci
//essa div terá position fixed com localização = do elemento 'selecionado' provavelmente

        this.toggleClass('show', true, this.$.highlighter);

        // get element's size dynamically
        var elementWidth = element.offsetWidth;
        var elementHeight = element.offsetHeight;


        // get left-position of element
        var elementLeftPosition = element.offsetLeft;
        // get height-position of element
        var elementTopPosition = element.offsetTop;

        highlighter.style.left = elementLeftPosition + "px";
        highlighter.style.top = elementTopPosition + "px";

//       highlighter.style.top = (elementTopPosition + 56) + "px";

       highlighter.style.width = elementWidth + "px";
       highlighter.style.height = elementHeight + "px";


        },

        unHighlight: function (element) {
//            element.style.border = 'none';
              this.toggleClass('show', false, this.$.highlighter);


        },
    })

})();
