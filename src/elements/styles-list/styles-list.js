// jshint unused:false
(function () {

    Polymer({
        is: 'carbo-styles-list',

        toggleClosedClass: function (event) {

            var groupNode = event.currentTarget.parentNode;
            var isClosed = groupNode.matches(".closed");

            if (isClosed === true) {
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
