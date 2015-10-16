var fs   = require('fs');
var path = require('path');

var _           = require('lodash');
var mergeStream = require('merge-stream');
var polymerIconset = require('gulp-polymer-iconset');

module.exports = function (gulp, $) {

    // generate-iconset
    gulp.task('iconsets', function () {

        var iconSets = {
            'actions': 'src/assets/icons/actions/**/*',
            'components': 'src/assets/icons/components/**/*',
            'minicomponents': 'src/assets/icons/minicomponents/**/*'
        };

        var streams = [];

        _.each(iconSets, function (src, setName) {
            var stream = gulp.src(src)
                .pipe(polymerIconset({
                    iconsetName: setName,
                    iconSize: 18,
                    iconId: function (file) {
                        return path.basename(file.path, '.svg');
                    },
                    ironIconsetSvgPath: '../../bower_components/iron-iconset-svg/iron-iconset-svg.html'
                }))
                .pipe(gulp.dest('src/elements/icons'));

            streams.push(stream);
        });

        return mergeStream(streams);
    });
};
