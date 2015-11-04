'use strict';

var fs = require('fs');

var _ = require('lodash');
var uuid = require('node-uuid');

exports.title = 'Text input';

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

exports.icon = "component-48:inputtext";

var template = _.template(fs.readFileSync(__dirname + '/template.html', 'utf-8'));

exports.renderHtml = function () {

    var inputName = 'campo-' + uuid.v4().substring(0, 3);

    // inputName = prompt('qual o noem do campo?');

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
