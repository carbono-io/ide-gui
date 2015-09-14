var fs   = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var runSequence = require('run-sequence');
var del         = require('del');

var config = require('./config');
var aux = require('./auxiliary');

module.exports = function (gulp, $, emitter) {

    // Path to the temporary files
    var tmpPath   = path.join(config.root, config.tmpDir);
    var cachePath = path.join(tmpPath, 'cache');

    /**
     * Clones code machine and sets up config files
     */
    gulp.task('clone:code-machine', ['tmp:create'], function (done) {
        var repo   = 'git@bitbucket.org:carbonoio/code-machine.git';

        /**
         * Clones git repo
         */
        function clone(cb) {
            return exec('git clone -b ide-integration --single-branch ' + repo, {
                cwd: cachePath,
            }, cb);
        }

        clone(function () {
            $.util.log('backend:code-machine clone finished');
            done();
        }).stderr.pipe(process.stdout);
    });

    /**
     * Builds the code-machine
     */
    gulp.task('build:code-machine', function (done) {

        var cmPath = path.join(tmpPath, 'code-machine');

        del.sync(cmPath);

        /**
         * Writes a config file for using with the IDE
         */
        function writeConfig() {

            var IDEConfig = JSON.stringify({
                port: 8000,
                codeDir: path.join(config.root, config.tmpDir, 'workspace'),
            });

            fs.writeFileSync(path.join(tmpPath, 'code-machine/config/ide.json'), IDEConfig, {
                encoding: 'utf8'
            });
        }

        /**
         * Installs npm dependencies for code-machine
         */
        function install(cb) {
            return exec('npm install', {
                cwd: cmPath
            }, cb);
        }

        // Copy from cache
        gulp.src(path.join(cachePath, 'code-machine/**/*'), { base: cachePath })
            .pipe(gulp.dest(tmpPath))
            .on('end', function () {

                // write configurations
                writeConfig();
                var installProcess = install(function () {
                    $.util.log('backend:code-machine npm install finished');
                    done();
                });

                installProcess.stdout.pipe(process.stdout);
                installProcess.stderr.pipe(process.stdout);
            });
    });

    gulp.task('setup:code-machine', function (done) {
        runSequence('clone:code-machine', 'build:code-machine', done);
    });
    
    /**
     * Clones the workspace repo into cache
     */
    gulp.task('clone:workspace', ['tmp:create'], function (done) {
        var repo   = 'git@bitbucket.org:carbonoio/base-polymer-project.git';

        var cloneProcess = exec('git clone -b ide-integration --single-branch ' + repo + ' workspace', {
            cwd: cachePath,
        }, function () {
            $.util.log('clone:workspace clone finished');
            done();
        });

        cloneProcess.stdout.pipe(process.stdout);
        cloneProcess.stderr.pipe(process.stdout);
    });

    /**
     * Builds up the workspace
     */
    gulp.task('build:workspace', function (done) {
        var wkPath = path.join(tmpPath, 'workspace');

        del.sync(wkPath);

        gulp.src(path.join(cachePath, 'workspace/**/*'), { base: cachePath })
            .pipe(gulp.dest(tmpPath))
            .on('end', function () {

                // -F for forcing latest on conflict resolution
                var installProcess = exec('bower install -F', {
                    cwd: wkPath,
                }, function () {

                    // Emit event for other tasks to deal with
                    emitter.emit('workspace-reset');

                    $.util.log('build:workspace bower install finished');
                    done();
                });

                installProcess.stdout.pipe(process.stdout);
                installProcess.stderr.pipe(process.stdout);
            });
    });

    gulp.task('setup:workspace', function (done) {
        runSequence('clone:workspace', 'build:workspace', done);
    });
};
