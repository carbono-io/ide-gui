var fs   = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var minimist = require('minimist');

var config = require('../config');

module.exports = function (gulp, $) {

    // Path to the temporary files
    var tmpPath   = path.join(config.root, config.tmpDir);
    var cachePath = path.join(tmpPath, 'cache');

    gulp.task('cache:carbo-inspector', ['tmp:create'], function (done) {
        var repo   = 'git@github.com:carbono-io/carbo-inspector.git';
        var knownOptions = {
            string: 'branch',
            default: { branch: 'develop' }
        };
        var options = minimist(process.argv.slice(2), knownOptions);

        $.util.log('cache:carbo-inspector start cloning from branch ' + options.branch);
        var cmd = [
            'git clone -b',
            options.branch,
            '--single-branch',
            repo
        ].join(' ');

        var cloneProcess = exec(cmd, { cwd: cachePath }, function () {
            done();
        });

        cloneProcess.stdout.pipe(process.stdout);
        cloneProcess.stderr.pipe(process.stdout);
    });
}