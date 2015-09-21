// Scripts dependend upon
require('./bower_components/webcomponentsjs/webcomponents-lite.js');

// Read configurations
var readConfig = require('./scripts/config');
var configPromise = readConfig();

// The application wrapper
var carbo = document.querySelector('#carbo');

// The router for page navigation
carbo.router = require('./scripts/router');

// Set placeholder data onto the main scope of the application
require('./scripts/placeholder-data')(carbo);

// Only start setting up thing when WebComponentsReady event is fired
window.addEventListener('WebComponentsReady', function () {

    configPromise.then(function (config) {
        // Router
        carbo.router = require('./scripts/router')(carbo, config);

        // Services
        require('./scripts/initialization/services')(carbo, config);        
        // Components
        require('./scripts/initialization/components')(carbo, config);
        // Reference to the carbono itself
        carbo.context = carbo;
    })
    .done();
});

// Export the component scope
module.exports = carbo;
