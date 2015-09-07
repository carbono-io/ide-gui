'use strict';

// Native dependencies
var path        = require('path');
var exec        = require('child_process').exec;

// External dependencies
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var through2    = require('through2');
var del         = require('del');

// Load all installed gulp plugins into $
var $           = require('gulp-load-plugins')();

// Constants
var SRC_DIR     = 'src';
var DIST_DIR    = 'dist';
var MAPS_DIR    = 'source-maps';

var JS_DIR = [
    SRC_DIR + '/**/*.js',
    '!' + SRC_DIR + '/bower_components/**/*',
    '!' + SRC_DIR + '/sandbox/**/*',
    'gulpfile.js',
];

var LESS_DIR = [
    SRC_DIR + '/**/*.less',
    '!' + SRC_DIR + '/bower_components/**/*',
];

var CSS_DIR = [
    SRC_DIR + '/**/*.css',
    '!' + SRC_DIR + '/bower_components/**/*',
];

var HTML_DIR = [
    SRC_DIR + '/**/*.html',
    '!' + SRC_DIR + '/bower_components/**/*',
];

/**
 * Task for less.
 */
gulp.task('less', function () {

    // Message to be prepended to all .css files generated via less
    var message = [
        '/*-----------------------------------------------------',
        ' | This file was generated by LESS.                   |',
        ' | All modifications to it will be lost, mercilessly! |',
        ' -----------------------------------------------------*/\n\n',
    ].join('\n');

    return gulp.src(LESS_DIR)
        .pipe($.changed(SRC_DIR, { extension: '.css' }))
        .pipe($.duration('Compiling .less files'))
            .pipe($.sourcemaps.init())
            .pipe($.less())
            .on('error', $.notify.onError({
                title: 'Less compiling error',
                message: '<%= error.message %>',
                open: 'file:///<%= error.filename %>',
                sound: 'Glass',
                // Basso, Blow, Bottle, Frog, Funk, Glass, Hero,
                // Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
                icon: path.join(__dirname, 'logo.png'),
            }))
            .pipe($.autoprefixer({
                browsers: [
                    'ie >= 10',
                    'ie_mob >= 10',
                    'ff >= 30',
                    'chrome >= 34',
                    'safari >= 7',
                    'opera >= 23',
                    'ios >= 7',
                    'android >= 4.4',
                    'bb >= 10'
                ],
                cascade: false,
            }))
            // .pipe($.minifyCss())
            .pipe($.header(message))
        .pipe($.sourcemaps.write(MAPS_DIR))
        // Put files at source dir in order to use them for vulcanization
        .pipe(gulp.dest(SRC_DIR))
        .pipe(gulp.dest(DIST_DIR))
        .pipe($.size({ title: 'less' }));
});

/**
 * Function for vulcanize task
 */
gulp.task('vulcanize', function () {
    return gulp.src(SRC_DIR + '/elements/elements.html')
        .pipe($.vulcanize({
            stripComments: true,
            inlineCss: true,
            inlineScripts: true,
        }))
        .pipe(gulp.dest(DIST_DIR + '/elements'))
        .pipe($.size({title: 'vulcanize'}));
});

gulp.task('distribute', ['vulcanize']);

// Beautifiers
gulp.task('beautify-html', function () {
    return gulp.src(HTML_DIR)
        .pipe($.jsbeautifier({indentSize: 4}))
        .pipe(gulp.dest('tmp'));
});

gulp.task('todo', function () {
    return gulp.src(JS_DIR.concat(LESS_DIR).concat(HTML_DIR))
        .pipe($.todo({
            reporter: 'markdown',
        }))
        .pipe(gulp.dest(''));
});

// Develop task
gulp.task('serve', function () {

    browserSync({
        port: 4000,
        server: {
            baseDir: 'src',
        },
        open: true,
        // tunnel: true
    });
});

gulp.task('watch', function () {

    // Watch files for changes
    // Using gulp-watch plugin because the default gulp.watch method does
    // not watch for newly added files. Porbably must revise soon.
    // http://stackoverflow.com/questions/22391527/
    // gulps-gulp-watch-not-triggered-for-new-or-deleted-files
    gulp.watch(LESS_DIR, ['less'])
        .on('change', function (event) {
            if (event.type === 'deleted') {

                var p = path.parse(event.path);
                var css = p.dir + '/' + p.name + '.css';

                // Remove css file
                del(css);
            }
        });

    gulp.watch(JS_DIR.concat(HTML_DIR), ['jshint', 'jscs', 'todo'])
        .on('change', browserSync.reload);

    gulp.watch(CSS_DIR)
        .on('change', browserSync.reload);
});

// Starts the mock server
gulp.task('mock-server', function () {

    // var mockServerModulePath = path.join(__dirname, 'node_modules/carbono-mocks');

    // // Consign uses `process.cwd()`, which fucks stuff up.
    // // `cd` into the dir before starting module up
    // exec('cd ' + mockServerModulePath + ' && node .', function (err, stdout, stderr) {

    //     if (!err) {
    //         // No error on mock server
    //         $.util.log($.util.colors.green('mock server running'));
    //         $.util.log($.util.colors.green(stdout));
    //     } else {
    //         // Error on mock server startup
    //         $.util.log($.util.colors.red('mock server startup problems'));
    //         $.util.log($.util.colors.red(stderr));
    //     }
    // });
});

gulp.task('develop', function (done) {
    runSequence(['less', 'mock-server'], 'serve', 'watch', done);
});

// Code style and quality checks
gulp.task('jshint', function () {

    var reporter = through2.obj(
        function (file, encoding, cb) {

            if (!file.jshint.success) {

                var err = new $.util.PluginError('jshint', {
                    message: 'JSHint failed at ' + file.path
                });

                // Store the path for later usage 
                err.path = file.path;

                // store errrors
                this.errors = this.errors || [];
                this.errors.push(err);
            }

            // continue stream
            cb(null, file);

        }, 
        function (cb) {

            if (this.errors && this.errors.length > 0) {
                cb(this.errors.pop());
            } else {
                $.util.log($.util.colors.green('JSHint passed with success :)'));
            }
        }
    );

    return gulp.src(JS_DIR.concat(HTML_DIR))
        .pipe($.jshint.extract('auto'))
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(reporter)
        .on('error', $.notify.onError({
            title: 'JSHint check error',
            message: '<%= error.message %>',
            open: 'file:///<%= error.path %>',
            sound: 'Glass',
            // Basso, Blow, Bottle, Frog, Funk, Glass, Hero,
            // Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
            icon: path.join(__dirname, 'logo.png'),
        }));
});

gulp.task('jscs', function () {

    gulp.src(JS_DIR)
        .pipe($.jscs({
            configPath: '.jscsrc',
            // fix: true
        }))
        .on('error', $.notify.onError({
            title: 'JSCS style check error',
            message: '<%= error.message %>',
            open: 'file:///<%= error.filename %>',
            sound: 'Glass',
            // Basso, Blow, Bottle, Frog, Funk, Glass, Hero,
            // Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
            icon: path.join(__dirname, 'logo.png'),
        }));
});

gulp.task('jsdoc', function () {
    gulp.src(JS_DIR)
        .pipe($.jsdoc.parser())
        .pipe($.jsdoc.generator('docs'));
});
