var fs = require('fs');
var gutil = require('gulp-util');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');


var jsRe = /.+\.js$/;
var htmlRe = /.+\.html$/;

var H = {

    /**
     * Converts a browserify stream into a gulp friendly vinyl stream
     */
    vinylifyBrowserify: function (b) {
        return b.bundle()
            // log errors if they happen
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(vinylSource('index.bundle.js'))
            // optional, remove if you don't need to buffer file contents
            .pipe(vinylBuffer());
    },

    isJs: function (file) {
        return jsRe.test(file.path);
    },

    isHtml: function (file) {
        return htmlRe.test(file.path);
    },

    fmtStrLength: function (str, length) {

        while (str.length < length) {
            str += ' ';
        }

        return str;
    },

    pathExists: function (p, dirOrFile) {

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
    }
};

module.exports = H;