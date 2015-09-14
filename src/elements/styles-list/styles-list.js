// jshint unused:false
(function () {

    Polymer({
        is: 'carbo-styles-list',

        ready: function() {

//
//            console.log('!!!!!!');
//            console.log(this.group);
//
//            var groupName = this.$$('#group-name');
//            var componentContext = this;
//
//            var isClosed = !this.closed;
//
//            if (isClosed) {
//                console.log('isclose')
//
//                console.log(componentContext);
//
//                var toBeClosed = componentContext.$$('#group');
//
//                console.log(toBeClosed)
//
//                Polymer.Base.toggleClass('closed', false, toBeClosed);
//
//                console.log('qweqweqweqw');
//                isClosed = false;
//            } else {
//                console.log('isnotcloses')
//                Polymer.Base.toggleClass('closed', true, componentContext.$$('#group'));
//                isClosed = true;
//            }
//
//            groupName.addEventListener('click', function(event) {
//
//                if (isClosed) {
//                    Polymer.Base.toggleClass('closed', false, componentContext.$$('#group'));
//                    isClosed = false;
//                } else {
//                    Polymer.Base.toggleClass('closed', true, componentContext.$$('#group'));
//                    isClosed = true;
//                }
//            });
        },
        toggleClosedClass: function (event) {

            var groupNode = event.currentTarget.parentNode;
            var isClosed = groupNode.matches(".closed");

            if(isClosed == true) {
                Polymer.Base.toggleClass('closed', false, groupNode);
                isClosed = false;

            } else {
                Polymer.Base.toggleClass('closed', true, groupNode);
                isClosed = true;
            }
        },

        setClassName: function () {
            var iconName = this.$$('.style-preview-2');
            console.log(iconName);
        },

    });

})();
