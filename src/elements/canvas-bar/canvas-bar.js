'use strict';

(function () {

    Polymer({
        is: "carbo-canvas-bar",
        properties: {
            mode: {
                type: String,
                value: 'inspect',
                // possible values: 'inspect', 'add', 'code', 'navigate'
                notify: true
            }
        }
    });

})();
