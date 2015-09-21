// Scripts dependend upon
require('./bower_components/webcomponentsjs/webcomponents-lite.js');

// The application wrapper
var carbo = document.querySelector('#carbo');

// The router for page navigation
carbo.router = require('./scripts/router');

// Set placeholder data onto the main scope of the application
require('./scripts/placeholder-data')(carbo);

window.addEventListener('WebComponentsReady', function () {
    
    // Config
    carbo.set('config', require('./scripts/config'));

    // Router
    carbo.router = require('./scripts/router')(carbo);

    // Services
    carbo.set('services', {});
    carbo.set('services.codeMachine', require('./scripts/services/code-machine'));
    carbo.set('services.componentsRegistry', require('./scripts/services/components-registry'));

    // Components
    carbo.set('components', {});
    carbo.set('components.body', document.querySelector('#body'));
    carbo.set('components.canvas', document.querySelector('#canvas'));
    carbo.set('components.componentsPalette', document.querySelector('#components-palette'));

    // Reference to the carbono itself
    carbo.context = carbo;
});

// Export the component scope
module.exports = carbo;
