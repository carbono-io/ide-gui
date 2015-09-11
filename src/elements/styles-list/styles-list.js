// jshint unused:false
(function () {

    Polymer({
        is: 'carbo-styles-list',

        ready: function() {

            console.log('!!!!!!');
            console.log(this.group);

            var groupName = this.$$('#group-name');
            var componentContext = this;

            var isClosed = !this.closed;

            if (isClosed) {
                console.log('isclose')

                console.log(componentContext);

                var toBeClosed = componentContext.$$('#group');

                console.log(toBeClosed)

                Polymer.Base.toggleClass('closed', false, toBeClosed);

                console.log('qweqweqweqw');
                isClosed = false;
            } else {
                console.log('isnotcloses')
                Polymer.Base.toggleClass('closed', true, componentContext.$$('#group'));
                isClosed = true;
            }

            groupName.addEventListener('click', function(event) {

                if (isClosed) {
                    Polymer.Base.toggleClass('closed', false, componentContext.$$('#group'));
                    isClosed = false;
                } else {
                    Polymer.Base.toggleClass('closed', true, componentContext.$$('#group'));
                    isClosed = true;
                }
            });
        },
    });

})();
