var fs = require('fs');
var path = require('path');

var gulpUtil = require('gulp-util');
var through2 = require('through2');
var cheerio  = require('cheerio');


var iconsetStart = [
    '<link rel="import" href="../iron-icon/iron-icon.html">',
    '<link rel="import" href="../iron-iconset-svg/iron-iconset-svg.html">',

    '<iron-iconset-svg name="my-svg-icons" size="24">',
        '<svg>',
            '<defs>'
].join('\n');

var iconsetEnd = [
            '</defs>',
        '</svg>',
    '</iron-iconset-svg>'
].join('\n');


var iconSetTemplate = fs.readFileSync(path.join(__dirname, 'icon-set-template.html'), 'utf8');

function polymerizeSvg(options) {


    var iconsetHtml = iconsetStart;

    return through2.obj(function (file, encoding, cb) {

        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }

        if (file.isBuffer()) {

            var stringFileContents = file.contents.toString(encoding);

//            console.log(stringFileContents);

            var $ = cheerio.load(stringFileContents, {
                xmlMode: true
            });

            var svgNode = $('svg');
            var iconNode = svgNode.children();
            var iconNodeHtml = $.xml(iconNode);

            iconsetHtml += iconNodeHtml;

            console.log('========');
            console.log(iconsetHtml);
        }

        if (file.isStream()) {
            throw new gulpUtil.PluginError('gulp-polymerize-svg', 'streams not currently supported');
        }


        cb(null, file);
    });

}

module.exports = polymerizeSvg;
