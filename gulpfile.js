// Native dependencies
var path        = require('path');
var fs          = require('fs');

// External dependencies
var gulp        = require('gulp-help')(require('gulp'));
var del         = require('del');

// Load all installed gulp plugins into $
var $           = require('gulp-load-plugins')();

// Internal dependencies
var config      = require('./tasks/config');
var helpers     = require('./tasks/helpers');

/**
 * Creates tmp dir if it does not exist yet
 */
gulp.task('tmp:create', function () {

    var tmpPath = path.join(__dirname, config.tmpDir);

    try {
        var stats = fs.lstatSync(tmpPath);

        if (!stats.isDirectory()) {
            fs.mkdirSync(tmpPath);
        }

    } catch (e) {
        fs.mkdirSync(tmpPath);
    }
});

/**
 * Cleans the config.tmpDir
 */
gulp.task('tmp:clean', function () {
    del.sync(path.join(__dirname, config.tmpDir));
});

require('./tasks/build')(gulp, $);
require('./tasks/backend')(gulp, $);
require('./tasks/develop')(gulp, $);
require('./tasks/linting')(gulp, $);

// do not show at help list
gulp.task('default', false, ['help'], function () {
    console.log('\nRun ' + $.util.colors.white.bgGreen('gulp develop') + ' if you are lost :)\n');
});
