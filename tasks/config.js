var path = require('path');
var fs   = require('fs');

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
    'tasks/**/*.js',
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

var elementsDirs = fs.readdirSync(SRC_DIR + '/elements');

// remove .DS_Store, if it exists
var DSStoreIndex = elementsDirs.indexOf('.DS_Store');
if (DSStoreIndex !== -1) {
    elementsDirs.splice(DSStoreIndex, 1);
}

elementsDirs = elementsDirs.map(function (d) {
    return path.join(SRC_DIR, 'elements', d, path.basename(d));
});

// js files that require browserifying
// don't put trailing.js
exports.browserifyEntries = [
    SRC_DIR + '/index',
].concat(elementsDirs);
