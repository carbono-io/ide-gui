module.exports = function (gulp, $) {
    require('./less')(gulp, $);
    require('./assets')(gulp, $);
    require('./javascript')(gulp, $);
    require('./distribute')(gulp, $);
};
