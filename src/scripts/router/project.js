// external dependencies
var page = require('page');

// services
var Projects = require('../services/projects')

/**
 * Routes related to project
 */
module.exports = function (carbo) {

    page('/project/:projectId', function (data) {

        carbo.set('route', 'project');
        carbo.set('section', 'style');

        Projects.readById(data.params.projectId)
            .then(function (project) {
                console.log(project)
                carbo.set('project', project);
            })
            // Call done to interrupt promise chain and throw errors.
            .done();
    });

    page('/project/:projectId/style', function (data) {

        carbo.set('route', 'project');
        carbo.set('section', 'style');

        Projects.readById(data.params.projectId)
            .then(function (project) {
                carbo.set('project', project);
            })
            // Finish promise chain and throw errors
            .done();
    });

    page('/project/:projectId/data', function (data) {
        carbo.set('route', 'project');
        carbo.set('section', 'data');

        Projects.readById(data.params.projectId)
            .then(function (project) {
                carbo.set('project', project);
            })
            // Finish promise chain and throw errors
            .done();
    });
    
    page('/new', function () {
        carbo.set('route', 'loading');

        Projects.create()
            .then(function (project) {
                carbo.set('project', project);

                page('/project/' + project.projectId);
            })
            // Finish promise chain and throw errors
            .done();
    });
};
