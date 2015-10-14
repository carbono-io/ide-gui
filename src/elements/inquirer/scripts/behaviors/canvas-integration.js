'use strict';

/**
 * Defines all integration between carbo-inquirer and carbo-canvas
 */

exports.properties = {
    canvas: {
        type: Object,
        notify: true,
        observer: '_handleCanvasChange',
    }
};

exports._handleCanvasChange = function (canvas, old) {

};
