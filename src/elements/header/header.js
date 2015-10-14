'use strict';

(function () {

    Polymer({
        is: 'carbo-header',

        /**
         * Toggles the header panel open or close
         * Called both on the overlay click and the title click
         */
        togglePanel: function() {
            var panel = this.$['carbo-header-panel'];
            var closePanel = this.$['close-header-panel'];

            if (this.isActive) {
                Polymer.Base.toggleClass('active', false, panel);
                this.isActive = false;
                Polymer.Base.toggleClass('active', false, closePanel);

            } else {
                Polymer.Base.toggleClass('active', true, panel);
                this.isActive = true;
                Polymer.Base.toggleClass('active', true, closePanel);
            }
        },
    });

})();
