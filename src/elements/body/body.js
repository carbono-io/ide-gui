(function () {

    Polymer({
        is: 'carbo-body',

        ready: function () {
            this.openLeftPanel();
            this.openCanvas();
            this.closeBox();
            this.openRightPanel();
        },

        openLeftPanel: function () {
            this.set('state.leftPanel', 'open');
        },

        openCanvas: function () {
            this.set('state.canvas', 'open');
        },

        openBox: function () {
            this.set('boxState', 'open');
        },

        closeBox: function () {
            this.set('boxState', 'closed');
        },

        openRightPanel: function () {
            this.set('state.rightPanel', 'open');
        }
    });

})();
