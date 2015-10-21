var fs   = require('fs');
var path = require('path');

var _           = require('lodash');
var mergeStream = require('merge-stream');
var polymerIconset = require('gulp-polymer-iconset');

module.exports = function (gulp, $) {

    // generate-iconset
    gulp.task('iconsets', function () {

        var iconSets = {
            'command-18': {
                iconSize: 18,
                src: 'src/assets/icons/command-18/**/*',
            },
            'component-48': {
                iconSize: 48,
                src: 'src/assets/icons/component-48/**/*',
            },
            'minicomponent-18': {
                iconSize: 18,
                src: 'src/assets/icons/minicomponent-18/**/*',
            }
        };

        var streams = [];

        _.each(iconSets, function (setDescription, setName) {
            var stream = gulp.src(setDescription.src)
                .pipe(polymerIconset({
                    iconsetName: setName,
                    iconSize: setDescription.size,
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
