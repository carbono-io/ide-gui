var fs   = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var runSequence = require('run-sequence');
var del         = require('del');

var config = require('../config');
var aux = require('../auxiliary');

module.exports = function (gulp, $) {

    // Path to the temporary files
    var tmpPath   = path.join(config.root, config.tmpDir);
    var cachePath = path.join(tmpPath, 'cache');

    /**
     * Clones code machine and sets up config files
     */
    gulp.task('cache:code-machine', ['tmp:create'], function (done) {
        var repo   = 'git@bitbucket.org:carbonoio/code-machine.git';

        /**
         * Clones git repo
         */
        function clone(cb) {
            return exec('git clone -b feature/JRD-465 --single-branch ' + repo, {
                cwd: cachePath,
            }, cb);
        }

        // delete
        del.sync(path.join(cachePath, 'code-machine'));

        clone(function () {
            $.util.log('backend:code-machine clone finished');


            var installProcess = exec('npm install', {
                cwd: path.join(cachePath, 'code-machine')
            }, function () {
                $.util.log('backend:code-machine npm install finished');
                done();
            });

            installProcess.stdout.pipe(process.stdout);
            installProcess.stderr.pipe(process.stdout);

        }).stderr.pipe(process.stdout);
    });

    /**
     * Builds the code-machine
     */
    gulp.task('copy:code-machine', function (done) {

        var cmPath = path.join(tmpPath, 'code-machine');

        del.sync(cmPath);

        /**
         * Writes a config file for using with the IDE
         */
        function writeConfig() {

            $.util.log($.util.colors.green('writing code-machine configurations'));

            var IDEConfig = JSON.stringify({
                port: 8000,
                projectDir: path.join(config.root, config.tmpDir, 'workspace'),
                sourceDir: 'src',
            });

            fs.writeFileSync(path.join(tmpPath, 'code-machine/config/ide.json'), IDEConfig, {
                encoding: 'utf8'
            });
        }

        // Copy from cache
        gulp.src(path.join(cachePath, 'code-machine/**/*'), {
                base: cachePath, 
                dot: true
            })
            .pipe(gulp.dest(tmpPath))
            .on('end', function () {

                // write configurations
                writeConfig();

                done();
            });
    });

    gulp.task('setup:code-machine', function (done) {
        runSequence('cache:code-machine', 'copy:code-machine', done);
    });
};
