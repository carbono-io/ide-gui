// load client-side scripts that we depend upon
require('./bower_components/webcomponentsjs/webcomponents-lite.js');

// load initialization scripts
var initServices   = require('./scripts/initialization/services');
var initComponents = require('./scripts/initialization/components');
var initRouter     = require('./scripts/initialization/router');

// Read configurations
var readConfig = require('./scripts/config');

// The application wrapper
var carbo = document.querySelector('#carbo');

// Set placeholder data onto the main scope of the application
require('./scripts/placeholder-data')(carbo);

// Only start setting up thing when WebComponentsReady event is fired
window.addEventListener('WebComponentsReady', function () {

    readConfig().then(function (config) {

        // Services
        var services = initServices(carbo, config);        
        // Components
        var components = initComponents(carbo, config);

        // Router
        var router = initRouter(carbo, config, services, components);
        carbo.router = router;
        // Reference to the carbono itself
        carbo.context = carbo;
    })
    .done();
});

// Export the component scope
module.exports = carbo;
