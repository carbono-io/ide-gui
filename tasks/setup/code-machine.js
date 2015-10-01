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
     * Clones code machine and sets up config files
     */
    gulp.task('cache:code-machine', ['tmp:create'], function (done) {
        // delete the current 
        $.util.log('cache:code-machine deleting old cache');
        del.sync(path.join(cachePath, 'code-machine'));

        var repo   = 'git@bitbucket.org:carbonoio/code-machine.git';
        var knownOptions = {
            string: 'branch',
            default: { branch: 'develop' }
        };
        var options = minimist(process.argv.slice(2), knownOptions);

        /**
         * Clones git repo
         */
        function clone(cb) {
            $.util.log('cache:code-machine start cloning from branch ' + options.branch);
            var cmd = [
                'git clone -b',
                options.branch,
                '--single-branch',
                repo
            ].join(' ');

            return exec(cmd, { cwd: cachePath }, cb);
        }

        clone(function () {
            $.util.log('cache:code-machine clone finished');

            $.util.log('cache:code-machine npm install started');
            var installProcess = exec('npm install', {
                cwd: path.join(cachePath, 'code-machine')
            }, function () {
                $.util.log('cache:code-machine npm install finished');
                done();
            });

            installProcess.stdout.pipe(process.stdout);
            installProcess.stderr.pipe(process.stdout);

        }).stderr.pipe(process.stdout);
    });

    /**
     * Builds the code-machine
     */
    gulp.task('reset:code-machine', function (done) {

        var cmPath = path.join(tmpPath, 'code-machine');

        $.util.log('reset:code-machine removing old files');
        del.sync(cmPath);
        $.util.log('reset:code-machine files removed');

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

        // Copy from cache, all files but '.git and gulpfile'
        var filesToCopy = [
            path.join(cachePath, 'code-machine/**/*'),
            '!' + path.join(cachePath, 'code-machine/.git/**/*'),
            '!' + path.join(cachePath, 'code-machine/gulpfile.js')
        ];

        $.util.log('reset:code-machine copying files')
        gulp.src(filesToCopy, {
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
        runSequence('cache:code-machine', 'reset:code-machine', done);
    });
};
