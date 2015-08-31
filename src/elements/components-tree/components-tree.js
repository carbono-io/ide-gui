// jshint unused:false
(function () {

    Polymer({
        is: 'carbo-components-tree',
        ready: function(){
            var componentItself = this.$$('#component-itself');
            console.log(componentItself);
            var componentContext = this;

            var isClosed = !this.closed;

            if (isClosed) {
                console.log('open')
                Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));
                isClosed = false;
            } else {
                console.log('close')
                Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));
                isClosed = true;
            }

            componentItself.addEventListener('click', function(event){

                if (isClosed) {
                    console.log('open')
                    Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));
                    isClosed = false;
                } else {
                    console.log('close')
                    Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));
                    isClosed = true;
                }
            });
        },

        properties: {
            component: {
                type: Object,
                notify: true,
            },
            closed: Boolean,
        }
    });

})();