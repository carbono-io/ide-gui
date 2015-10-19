var fs = require('fs');
var path = require('path');

var _ = require('lodash');

var config = require('../config');

module.exports = function (gulp, $) {
    require('./less')(gulp, $);
    require('./assets')(gulp, $);
    require('./javascript')(gulp, $);
    require('./distribute')(gulp, $);

    gulp.task('extract-registry-dependencies', function () {
        var registry = require('../../src/scripts/services/components-registry/mock-data');

        var componentDependencies = {};

        registry.forEach(function (entry) {
            if (entry.components) {
                entry.components.forEach(function (cp) {
                    componentDependencies[cp.name] = cp.repository;
                });
            }
        });

        fs.writeFileSync(
            path.join(config.tmpDir, 'registry-dependencies.json'),
            JSON.stringify(componentDependencies, null, '\t')
        );
    });
};
