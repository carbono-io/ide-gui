var path = require('path');

var _ = require('lodash');

var watchify = require('watchify');

// Constants
var SRC_DIR     = 'src';
var STAGE_DIR   = 'stage';
var DIST_DIR    = 'dist';
var MAPS_DIR    = 'source-maps';
var TMP_DIR     = 'tmp';

exports.root = path.join(__dirname, '..');
exports.srcDir = SRC_DIR;
exports.stageDir = STAGE_DIR;
exports.distDir = DIST_DIR;
exports.mapsDir = MAPS_DIR;
exports.tmpDir = TMP_DIR;

exports.jsDir = [
    SRC_DIR + '/**/*.js',
    '!' + SRC_DIR + '/**/*.bundle.js',
    '!' + SRC_DIR + '/bower_components/**/*',
    '!' + SRC_DIR + '/sandbox/**/*',
    'gulpfile.js',
];

exports.lessDir = [
    SRC_DIR + '/**/*.less',
    '!' + SRC_DIR + '/bower_components/**/*',
];

exports.cssDir = [
    SRC_DIR + '/**/*.css',
    '!' + SRC_DIR + '/bower_components/**/*',
];

exports.htmlDir = [
    SRC_DIR + '/**/*.html',
    '!' + SRC_DIR + '/bower_components/**/*',
];

/**
 * Browserify
 */
exports.browserifyOptions = _.assign({}, watchify.args, {
    entries: ['./src/index.js'],
    debug: true,
    standalone: 'C',
});