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

        // instantiate new code machine client
        var codeMachineService = new CodeMachineClient({
            location: CONFIG.codeMachine.getBaseLocation(projectId),
            socketIoPath: '/mc/cm/' + projectId,
            userService: services.userService,
        });

        // set it onto the main scope and notify 
        // that the entryFileLocation has changed
        carbo.set('services.codeMachine', codeMachineService);
        carbo.notifyPath('services.codeMachine.entryFileLocation', codeMachineService.entryFileLocation);

        projectsService.readById(projectId)
            .then(function (project) {
                // carbo.set('project', project);
            })
            // Call done to interrupt promise chain and throw errors.
            .done();
    });
};
