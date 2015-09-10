var fs   = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var config = require('./config');
var H = require('./helpers');

module.exports = function (gulp, $) {

    /**
     * Clones code machine and sets up config files
     */
    gulp.task('backend:code-machine', ['tmp:create'], function (done) {
        var repo = 'git@bitbucket.org:carbonoio/code-machine.git';
        var tmpPath   = path.join(config.root, config.tmpDir);
        var cmPath    = path.join(tmpPath, 'code-machine');

        if (H.pathExists(cmPath, 'dir')) {

            $.util.log($.util.colors.green('code-machine already installed'));
            done();

            return;
        }

        /**
         * Clones git repo
         */
        function clone(cb) {
            return exec('git clone -b develop --single-branch ' + repo, {
                cwd: tmpPath,
            }, cb);
        }

        /**
         * Writes a config file for using with the IDE
         */
        function writeConfig() {

            var IDEConfig = JSON.stringify({
                port: 8000,
                codeDir: '../workspace',
            });

            fs.writeFileSync(path.join(cmPath, 'config/ide.json'), IDEConfig, {
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

        clone(function () {
            writeConfig();
            $.util.log('backend:code-machine clone finished');
            install(function () {
                $.util.log('backend:code-machine npm install finished');
                done();
            });
        });
    });

    /**
     * Clones workspace dir and installs bower dependencies
     */
    gulp.task('backend:workspace', ['tmp:create'], function (done) {
        var repo     = 'git@bitbucket.org:carbonoio/base-polymer-project.git';
        var tmpPath  = path.join(config.root, config.tmpDir);
        var projPath = path.join(tmpPath, 'workspace');

        if (H.pathExists(projPath, 'dir')) {
            $.util.log($.util.colors.green('workspace already installed'));
            done();

            return;
        }

        function clone(cb) {
            return exec('git clone -b develop --single-branch ' + repo + ' workspace', {
                cwd: tmpPath,
            }, cb);
        }

        function install(cb) {
            // -F for forcing latest on conflict resolution
            return exec('bower install -F', {
                cwd: projPath,
            }, cb);
        }

        clone(function () {
            $.util.log('backend:workspace clone finished');
            install(function () {
                $.util.log('backend:workspace bower install finished');
                done();
            });
        });
    });

    /**
     * Resets the workspace to the last version at remote repo
     */
    gulp.task('backend:workspace:reset', function () {
        var projPath = path.join(config.root, config.tmpDir, 'workspace');

        del.sync(projPath);
        return runSequence('backend:workspace');
    });

    /**
     * Updates both code-machine and workspace
     */
    gulp.task('backend:update', ['backend:code-machine', 'backend:workspace'], function () {
        $.util.log($.util.colors.green('Code machine and workspace updated'));
    });

};
