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

            // Element under that position
            var element = document.elementFromPoint(pos.x, pos.y);

            if (this.activeElement) {
                this.unHighlight(this.activeElement);
            }

            this.highlight(element);


            // Set active element
            this.activeElement = element;
        },

        highlight: function (element) {
            // if (this.activeElement === element) {
            //     return;
            // }

            console.log('highlight');
            console.log(element)

            element.style.border = '4px red dashed';

        },

        unHighlight: function (element) {
            element.style.border = 'none';
        },
    })

})();