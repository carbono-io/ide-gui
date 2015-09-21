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
