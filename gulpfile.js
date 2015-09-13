// Native dependencies
var path         = require('path');
var fs           = require('fs');
var EventEmitter = require('events');

// External dependencies
var gulp        = require('gulp-help')(require('gulp'));
// var gulpRepl    = require('gulp-repl');
var del         = require('del');

// Load all installed gulp plugins into $
var $           = require('gulp-load-plugins')();

// Internal dependencies
var config      = require('./tasks/config');
var aux         = require('./tasks/auxiliary');

// Instantiate an EventEmitter for intertask communication
var emitter = new EventEmitter();

require('./tasks/basic')(gulp, $, emitter);
require('./tasks/build')(gulp, $, emitter);
require('./tasks/setup')(gulp, $, emitter);
require('./tasks/develop')(gulp, $, emitter);
require('./tasks/linting')(gulp, $, emitter);

// do not show at help list
gulp.task('default', false, ['help'], function () {
    console.log('\nRun ' + $.util.colors.white.bgGreen('gulp develop') + ' if you are lost :)\n');
});
