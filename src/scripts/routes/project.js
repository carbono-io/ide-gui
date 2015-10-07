'use strict';

// external dependencies
var page = require('page');

// internal dependencies
var CodeMachineClient = require('../services/code-machine');
var CONFIG            = require('../config');


/**
 * Routes related to project
 */
module.exports = function (carbo, config, services, components) {


    console.log(services);

    var projectsService = services.projectsService;

    // route for creating new project
    page('/project/new', function () {
        carbo.set('route', 'loading');

        projectsService.create()
            .then(function (project) {
                carbo.set('project', project);

                page('/projects/' + project.projectId);
            })
            // Finish promise chain and throw errors
            .done();
    });

    // route for accessing a project at a given section
    page('/projects/:projectId/:section?', function (data) {

        var projectId = data.params.projectId;

        // default section to `style`
        var section = data.params.section || 'style';

        carbo.set('route', 'project');
        carbo.set('section', section);

        console.log(CONFIG);

        // instantiate new code machine client
        var codeMachineService = new CodeMachineClient({
            location: CONFIG.codeMachine.getSocketIOConnectionLocation(projectId),
            userService: services.user
        });

        console.log('hey')

        carbo.set('services.codeMachine', codeMachineService);
        carbo.set(
            'services.codeMachine.markedResourcesLocation', 
            CONFIG.codeMachine.getMarkedResourcesBaseLocation(projectId)
        );

        projectsService.readById(projectId)
            .then(function (project) {
                carbo.set('project', project);
            })
            // Call done to interrupt promise chain and throw errors.
            .done();
    });
};
