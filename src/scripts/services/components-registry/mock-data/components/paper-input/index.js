'use strict';

var fs = require('fs');

var _ = require('lodash');
var uuid = require('node-uuid');

exports.title = 'Input de texto';

exports.context = {
    show: ['FORM', 'CARBO-FORM'],
    insertion: {
        'FORM': false,
        'CARBO-FORM': 'form',
    }
};

exports.postInsertion = {
    focus: 'paper-input',
};

exports.icon = "text-format";

var template = _.template(fs.readFileSync(__dirname + '/template.html', 'utf-8'));

exports.renderHtml = function () {

    var inputName = 'campo-' + uuid.v4().substring(0, 3);

    return template({
        name: inputName
    });
};

exports.components = [
    {
        name: 'paper-input',
        repository: 'PolymerElements/paper-input'
    }
];