var fs = require('fs');
var gutil = require('gulp-util');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');


var jsRe = /.+\.js$/;
var htmlRe = /.+\.html$/;

exports.jsRe = jsRe;
exports.htmlRe = htmlRe;

/**
 * Converts a browserify stream into a gulp friendly vinyl stream
 */
exports.vinylifyBrowserify = function (b) {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(vinylSource('index.bundle.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(vinylBuffer());
};

exports.isJs = function (file) {
    return jsRe.test(file.path);
};

exports.isHtml = function (file) {
    return htmlRe.test(file.path);
};

exports.fmtStrLength = function (str, length) {

    while (str.length < length) {
        str += ' ';
    }

    return str;
};

exports.pathExists = function (p, dirOrFile) {

    var exists;
    dirOrFile = dirOrFile || 'file';

    try {
        var stats = fs.lstatSync(p);

        if (dirOrFile === 'dir') {
            exists = stats.isDirectory();
        } else {
            exists = stats.isFile();
        }

    } catch (e) {
        exists = false;
    }

    return exists;
};