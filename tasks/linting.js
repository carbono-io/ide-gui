// Internal dependencies
var path = require('path');

// External dependencies
var through2 = require('through2');

//////////////////
// code quality //
//////////////////

var config = require('./config');

module.exports = function (gulp, $) {

    /**
     * Runs jshint against the code from scripts and webcomponents
     */
    gulp.task('jshint', 'Checks javascript code for possible errors', function () {

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

        return gulp.src(config.jsDir.concat(config.htmlDir))
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

    /**
     * Runs jscs against scripts. Todo: extract js from web componetns as well.
     */
    gulp.task('jscs', 'Checks your javascript code for style errors', function () {

        gulp.src(config.jsDir, { base: '.' })
            .pipe($.jscs({
                configPath: '.jscsrc',
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

    //////////////////
    // code quality //
    //////////////////
}
