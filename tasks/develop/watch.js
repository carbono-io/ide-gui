var path = require('path');
var exec = require('child_process').exec;

// External
var browserSync = require('browser-sync');
var browserify  = require('browserify');
var watchify    = require('watchify');
var brfs        = require('brfs');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var mergeStream = require('merge-stream');
var runSequence = require('run-sequence');
var del         = require('del');

var config = require('../config');
var aux = require('../auxiliary');

// RegExp for matching srcDir
var srcDirRegExp = new RegExp('^' + config.srcDir + '/');

module.exports = function (gulp, $) {

    /**
     * Builds a watchify bundler for a given entry
     */
    function buildWatchifyBundler(entry) {
        // Message to be prepended to all .js files generated via less
        var message = [
            '/*-----------------------------------------------------',
            ' | This file was generated by Browserify.             |',
            ' | All modifications to it will be lost, mercilessly! |',
            ' -----------------------------------------------------*/\n\n',
        ].join('\n');

        // Instantiate watchify
        var w = watchify(browserify({
            entries: [entry]
        }));

        // set brfs transform
        w.transform(brfs);

        w.on('update', watchifyBundle); // on any dep update, runs the bundler
        w.on('log', $.util.log); // output build logs to terminal

        // Build a file path for writing the resulting
        // browserified file
        var gulpEntryFilePath = entry
            .replace(srcDirRegExp, '')
            .replace(/\.js$/, '');

        /**
         * Bundles browserify stack using watchify
         */
        function watchifyBundle() {
            return w.bundle()
                .pipe(vinylSource(gulpEntryFilePath + '.bundle.js'))
                .pipe(vinylBuffer())
                .on('end', browserSync.reload)
                .pipe($.header(message))
                .pipe(gulp.dest(config.srcDir))
                .pipe($.size({
                    title: 'watchify:javascript',
                    showFiles: true
                }));
        }

        // Invoke watchify bundle once to start watching files
        // and return the stream in order to prevent subsequent
        // tasks from continuing without the browserify being complete
        // (crappish gulp+browserify+watchify integration)
        return watchifyBundle();
    }

    /**
     * Uses watchify to watch for file
     * changes and recompile javascript
     */
    gulp.task('watch:watchify', function () {
        var watchifyStreams = config.browserifyEntries.map(buildWatchifyBundler);

        return mergeStream(watchifyStreams);
    });

    /**
     * Watches files for changes and acts accordingly
     */
    gulp.task('watch', 'Watch files for changes and reload servers', ['watch:watchify'], function () {

        // HTML & web-components
        gulp.watch(config.htmlDir)
            .on('change', browserSync.reload);

        // LESS
        gulp.watch(config.lessDir, ['less'])
            .on('change', function (event) {
                if (event.type === 'deleted') {

                    var p = path.parse(event.path);
                    var css = p.dir + '/' + p.name + '.css';

                    // Remove css file
                    del(css);
                }
            });
        gulp.watch(config.cssDir)
            .on('change', browserSync.reload);
    });
};
