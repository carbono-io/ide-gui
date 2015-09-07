'use strict';
(function () {

    Polymer({
        is: 'carbo-header',
        togglePanel:function(){
            var panel = this.$['carbo-header-panel'];
            var closePanel = this.$['close-header-panel'];

            if (this.isActive) {
                console.log('close');
                Polymer.Base.toggleClass('active', false, panel);
                this.isActive = false;
                Polymer.Base.toggleClass('active', false, closePanel);

            } else {
                console.log('open');
                Polymer.Base.toggleClass('active', true, panel);
                this.isActive = true;
                Polymer.Base.toggleClass('active', true, closePanel);
            }

        },

        properties: {
            greeting: {
                type: String,
                value: 'Welcome!',
                notify: true
            }
        }
    });

})();