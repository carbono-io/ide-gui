// Native dependencies
var path         = require('path');
var fs           = require('fs');
var EventEmitter = require('events');

// External dependencies
var gulp        = require('gulp-help')(require('gulp'));
var del         = require('del');

// Load all installed gulp plugins into $
var $           = require('gulp-load-plugins')();

// Internal dependencies
var config      = require('./tasks/config');
var aux         = require('./tasks/auxiliary');

require('./tasks/basic')(gulp, $);
require('./tasks/build')(gulp, $);
require('./tasks/setup')(gulp, $);
require('./tasks/develop')(gulp, $);
require('./tasks/linting')(gulp, $);

var polymerizeSvg = require('./tasks/gulp-polymerize-svg');

// generate-iconset
gulp.task('iconset', function () {

    gulp.src('src/assets/icons/actions/**/*')
        .pipe(polymerizeSvg())
        .pipe(gulp.dest('_teste'));
//    polymerizeSvg();
});

// do not show at help list
gulp.task('default', false, ['help'], function () {
    console.log('\nRun ' + $.util.colors.white.bgGreen('gulp develop') + ' if you are lost :)\n');
});
