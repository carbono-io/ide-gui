'use strict';

var CONSTANTS = require('../constants');

/**
 * Components are already instantiated through the html
 * Thus, all we do in this initialization function is to 
 * get a reference to them and set them onto the main application scope.
 */
module.exports = function (carbo, config) {

    var body                 = document.querySelector('#body');
    var canvas               = document.querySelector('#canvas');
    var canvasInquirer       = document.querySelector('#canvas-inquirer');
    var componentsPalette    = document.querySelector('#components-palette');
    var componentsPaletteBox = document.querySelector('#components-palette-box');
    var componentsTreePanel  = document.querySelector('#components-tree-panel');

    carbo.set('components', {});
    carbo.set('components.body', body);
    carbo.set('components.canvas', canvas);
    carbo.set('components.canvasInquirer', canvasInquirer);
    carbo.set('components.componentsPalette', componentsPalette);
    carbo.set('components.componentsTreePanel', componentsTreePanel);

    return carbo.get('components');
};
