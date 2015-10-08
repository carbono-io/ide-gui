'use strict';

/**
 * Instantiates all services required for the
 * proper functioning of the application
 */

// Service classes
var CodeMachineClient        = require('../services/code-machine');
var ComponentsRegistryClient = require('../services/components-registry');
var UserServiceClient        = require('../services/user');
var ProjectsService          = require('../services/projects');

/**
 * Export function that receives carbo and configurations
 */
module.exports = function (carbo, config) {
    
    // instantiate a user service client,
    // as it is a requirement for all other services
    var userService = new UserServiceClient({
        location: config.userServiceLocation
    });

    var componentsRegistryService = new ComponentsRegistryClient({
        location: config.componentsRegistryLocation,
        userService: userService,
    });

    var projectsService = new ProjectsService({
        location: config.projectsServiceLocation,
        userService: userService,
    });

    // set services onto carbo main scope, so that
    // all components may have access to them.
    carbo.set('services', {});
    carbo.set('services.userService', userService);
    carbo.set('services.componentsRegistry', componentsRegistryService);
    carbo.set('services.projectsService', projectsService);

    // return all services as a result of the initialization
    return carbo.get('services');
};
