// jshint unused:false
(function () {

    Polymer({
        is: 'carbo-data-table',

        ready: function() {
                    var entityId = this.$$('#entity-id');
                    console.log(entityId);
                    var componentContext = this;

                    var isClosed = !this.closed;

                    if (isClosed) {
                        console.log('open');
                        Polymer.Base.toggleClass('closed', false, componentContext.$$('#entity'));
                        isClosed = false;
                    } else {
                        console.log('close');
                        Polymer.Base.toggleClass('closed', true, componentContext.$$('#entity'));
                        isClosed = true;
                    }

                    entityId.addEventListener('click', function(event) {

                        if (isClosed) {
                            console.log('open');
                            Polymer.Base.toggleClass('closed', false, componentContext.$$('#entity'));
                            isClosed = false;
                        } else {
                            console.log('close');
                            Polymer.Base.toggleClass('closed', true, componentContext.$$('#entity'));
                            isClosed = true;
                        }
                    });

                    handleClick: function() {
                        alert('Ow!');
                    }




        },







    });

})();
