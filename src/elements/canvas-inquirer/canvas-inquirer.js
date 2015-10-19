'use strict';

Polymer({
    is: 'carbo-canvas-inquirer',

    properties: {
        canvas: {
            type: Object,
            notify: true,

            observer: '_handleCanvasChange',
        }
    },

    _handleCanvasChange: function (canvas, old) {

    },

    prompt: function (questions) {
        return this.$.inquirer.prompt(questions);
    }

});
