'use strict';

/**
 * Components are already instantiated through the html
 * Thus, all we do in this initialization function is to 
 * get a reference to them and set them onto the main application scope.
 */
module.exports = function (carbo, config) {
    carbo.set('components', {});
    carbo.set('components.body', document.querySelector('#body'));
    carbo.set('components.canvas', document.querySelector('#canvas'));
    carbo.set('components.componentsPalette', document.querySelector('#components-palette'));

    return carbo.get('components');
};
