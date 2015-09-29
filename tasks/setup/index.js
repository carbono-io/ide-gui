module.exports = function (gulp, $) {
    require('./code-machine')(gulp, $);
    require('./workspace')(gulp, $);

    gulp.task('setup', 'setups dependencies', ['setup:code-machine', 'setup:workspace']);
};
