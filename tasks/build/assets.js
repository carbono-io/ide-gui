var fs   = require('fs');
var path = require('path');

var _           = require('lodash');
var mergeStream = require('merge-stream');
var polymerIconset = require('gulp-polymer-iconset');

module.exports = function (gulp, $) {

    // generate-iconset
    gulp.task('iconsets', function () {

        // the directory in which the source svg files of the icons are
        var iconsDir = 'src/assets/icons';

        // description of each of the iconsets
        var iconsetDescriptions = [
            {
                name: 'command',
                sizes: [18],
            },
            {
                name: 'component',
                sizes: [48],
            },
            {
                name: 'minicomponent',
                sizes: [18]
            }
        ];

        // Array that contains all the streams that generate the iconsets
        var iconsetGenerationStreams = [];

        iconsetDescriptions.forEach(function (description) {

            description.sizes.forEach(function (size) {
                var iconsetName = description.name + '-' + size;
                var iconsetSrc  = path.join(iconsDir, iconsetName, '**/*');

                var stream = gulp.src(iconsetSrc)
                    .pipe(polymerIconset({
                        iconsetName: iconsetName,
                        iconSize: size,
                        iconId: function (file) {
                            return path.basename(file.path, '.svg');
                        },
                        ironIconsetSvgPath: '../../bower_components/iron-iconset-svg/iron-iconset-svg.html'
                    }))
                    .pipe(gulp.dest('src/elements/icons'));

                iconsetGenerationStreams.push(stream);
            });
        });

        return mergeStream(iconsetGenerationStreams);
    });
};
