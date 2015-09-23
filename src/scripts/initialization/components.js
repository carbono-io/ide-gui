'use strict';

/**
 * Components are already instantiated through the html
 * Thus, all we do in this initialization function is to 
 * get a reference to them and set them onto the main application scope.
 */
module.exports = function (carbo, config) {

    var body              = document.querySelector('#body');
    var canvas            = document.querySelector('#canvas');
    var componentsPalette = document.querySelector('#components-palette');

    // TODO: check if this is a good approach.
    canvas.addEventListener('focused-element-data-changed', function (event) {

        var value = event.detail.value;

        if (value) {
            // open box when value is not null
            body.openBox();
        } else {
            // close otherwise
            body.closeBox();
        }

    });

    carbo.set('components', {});
    carbo.set('components.body', body);
    carbo.set('components.canvas', canvas);
    carbo.set('components.componentsPalette', componentsPalette);

    return carbo.get('components');
};
