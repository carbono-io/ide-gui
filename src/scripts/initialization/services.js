/**
 * Instantiates all services required for the
 * proper functioning of the application
 */

// Service classes
var CodeMachineClient        = require('../services/code-machine');
var ComponentsRegistryClient = require('../services/components-registry');
var UserServiceClient        = require('../services/user');

/**
 * Export function that receives carbo and configurations
 */
module.exports = function (carbo, config) {

    carbo.set('services', {});
    
    var userService = new UserServiceClient({
        location: config.userServiceLocation
    });
    carbo.set('services.user', userService);

    var codeMachineService = new CodeMachineClient({
        location: config.codeMachineLocation,
        userService: userService
    });
    carbo.set('services.codeMachine', codeMachineService);

    var componentsRegistryService = new ComponentsRegistryClient({
        location: config.componentsRegistryLocation,
        userService: userService,
    });
    carbo.set('services.componentsRegistry', componentsRegistryService);

};
