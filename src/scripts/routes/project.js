// external dependencies
var page = require('page');

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

        // default section to `style`
        var section = data.params.section || 'style';

        carbo.set('route', 'project');
        carbo.set('section', section);

        projectsService.readById(data.params.projectId)
            .then(function (project) {
                console.log(project)
                carbo.set('project', project);
            })
            // Call done to interrupt promise chain and throw errors.
            .done();
    });
};
