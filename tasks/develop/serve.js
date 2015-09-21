var path = require('path');
var exec = require('child_process').exec;

// External
var browserSync = require('browser-sync');

var config = require('../config');
var aux = require('../auxiliary');

module.exports = function (gulp, $) {

    /**
     * Starts the code-machine code-machine for development purposes
     */
    gulp.task('serve:code-machine', 'Start code-machine for development', function () {

        // $.util.log($.util.colors.red('Buggish. Not working yet, please start the process manually by running: `cd tmp/code-machine`, `export NODE_ENV=ide` and `node .` sequentially'));

        // Execute
        var cmProcess = exec('node .', {
            cwd: path.join(config.root, config.tmpDir, 'code-machine'),
            env: {
                NODE_ENV: 'ide'
            }
        });

        // // Stdout
        cmProcess.stdout.pipe(process.stdout);
        cmProcess.stderr.pipe(process.stdout);
    });

    /**
     * Compiles todos throughout the source code
     */
    gulp.task('dev:todo', 'Retrieve all todos to TODO.md file', function () {
        return gulp.src(config.jsDir.concat(config.lessDir).concat(config.htmlDir))
            .pipe($.todo({
                reporter: 'markdown',
            }))
            .pipe(gulp.dest(''));
    });

    /**
     * Serves the application client
     */
    gulp.task('serve:src', 'Serve the source code (for development)', ['serve:code-machine'], function () {

        var bs = browserSync({
            port: 4000,
            server: {
                baseDir: 'src',
            },
            open: true,
            // tunnel: true
        });

        function notifyIsSrcServer() {
            bs.notify('<b>/src</b>', 3000);
        }

        bs.emitter.on('client:connected', notifyIsSrcServer);
    });

    /**
     * Serves the application client
     */
    gulp.task('serve:stage', 'Serve the staging environment', ['serve:code-machine'], function () {

        var bs = browserSync({
            port: 4001,
            server: {
                baseDir: 'stage',
                index: 'index.build.html'
            },
            serveStatic: [config.srcDir + '/' + config.mapsDir],
            open: true,
        });

        function notifyIsStagingServer() {
            bs.notify('<b>/stage</b>', 3000);
        }

        bs.emitter.on('client:connected', notifyIsStagingServer);
        // setTimeout(notifyIsStagingServer, 3000);
    });

    /**
     * Serves the application client
     */
    gulp.task('serve:dist', 'Serve the distribution environment', ['serve:code-machine'], function () {

        var bs = browserSync({
            port: 4002,
            server: {
                baseDir: 'dist',
                index: 'index.build.html'
            },
            open: true,
        });

        function notifyIsDistServer() {
            bs.notify('<b>/dist</b>', 3000);
        }

        bs.emitter.on('client:connected', notifyIsDistServer);
    });

};
