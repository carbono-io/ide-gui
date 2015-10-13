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
var I18NService              = require('../services/i18n');

/**
 * Export function that receives carbo and configurations
 */
module.exports = function (carbo, config) {
    
    // instantiate a user service client,
    // as it is a requirement for all other services
    var userService = new UserServiceClient({
        location: config.userServiceLocation
    });

    var codeMachineService = new CodeMachineClient({
        location: config.codeMachineLocation,
        userService: userService
    });

    var componentsRegistryService = new ComponentsRegistryClient({
        location: config.componentsRegistryLocation,
        userService: userService,
    });

    var projectsService = new ProjectsService({
        location: config.projectsServiceLocation,
        userService: userService,
    });

    var i18nService = new I18NService();

    // set services onto carbo main scope, so that
    // all components may have access to them.
    carbo.set('services', {});
    carbo.set('services.user', userService);
    carbo.set('services.codeMachine', codeMachineService);
    carbo.set('services.componentsRegistry', componentsRegistryService);
    carbo.set('services.projectsService', projectsService);
    carbo.set('services.i18n', i18nService);

    // return all services as a result of the initialization
    return carbo.get('services');
};
