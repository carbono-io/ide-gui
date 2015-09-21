module.exports = function (gulp, $) {
    require('./code-machine')(gulp, $);
    require('./workspace')(gulp, $);
};
