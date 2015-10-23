var fs   = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var runSequence = require('run-sequence');
var del         = require('del');
var minimist    = require('minimist');

var config = require('../config');
var aux = require('../auxiliary');

module.exports = function (gulp, $) {

    // Path to the temporary files
    var tmpPath   = path.join(config.root, config.tmpDir);
    var cachePath = path.join(tmpPath, 'cache');

    /**
     * Clones the workspace repo into cache
     */
    gulp.task('cache:workspace', ['tmp:create'], function (done) {
        $.util.log('cache:workspace removing files');
        del.sync(path.join(cachePath, 'workspace'));

        var repo   = 'git@github.com:carbono-io/base-polymer-project.git';
        var knownOptions = {
            string: 'branch',
            default: { branch: 'develop' }
        };
        var options = minimist(process.argv.slice(2), knownOptions);

        // build the bash command string
        var cloneCommand = [
            'git clone -b',
            options.branch,
            '--single-branch',
            repo,
            'workspace'
        ].join(' ');

        var cloneProcess = exec(cloneCommand, { cwd: cachePath }, function () {
            $.util.log('cache:workspace clone finished');
            $.util.log('cache:workspace start bower install');

            // -F for forcing latest on conflict resolution
            var installProcess = exec('bower install -F --production', {
                cwd: path.join(cachePath, 'workspace'),
            }, function () {

                $.util.log('cache:workspace bower install finished');
                done();
            });

            // pipe logging
            installProcess.stdout.pipe(process.stdout);
            installProcess.stderr.pipe(process.stdout);
        });

        cloneProcess.stdout.pipe(process.stdout);
        cloneProcess.stderr.pipe(process.stdout);
    });

    /**
     * Builds up the workspace
     */
    gulp.task('reset:workspace', function (done) {
        var wkPath = path.join(tmpPath, 'workspace');

        $.util.log('reset:workspace removing old files');
        del.sync(wkPath);

        // Copy from cache, all files but '.git and gulpfile'
        var filesToCopy = [
            path.join(cachePath, 'workspace/**/*'),
            '!' + path.join(cachePath, 'workspace/.git/**/*'),
            '!' + path.join(cachePath, 'workspace/gulpfile.js')
        ];

        gulp.src(filesToCopy, {
                base: cachePath, 
                dot: true
            })
            .pipe(gulp.dest(tmpPath));
    });

    gulp.task('setup:workspace', function (done) {
        runSequence('cache:workspace', 'reset:workspace', done);
    });
};
