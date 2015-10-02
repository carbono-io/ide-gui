'use strict';

// native dependencies
var fs = require('fs');

// title of the component, to be shown at the palette
exports.title = "Formulário";

// context within which the html should be inserted
exports.context =  {
    show: ['PAGE', 'BODY'],
    insertion: ''
};

// let the ide know that this component requires an entity
exports.requiresEntity = true;

// select the carbo-form after the component is inserted
exports.postInsertion = {
    focus: 'carbo-form',
};

// icon to be shown on palette
exports.icon = "assignment";

// the html string
exports.html = fs.readFileSync(__dirname + '/template.html', 'utf-8');

// bower components the component depends upon
exports.components = [
    {
        name: 'carbo-form',
        repository: 'https://github.com/carbono-io/carbo-form.git',
    },
    {
        name: 'iron-form',
        repository: 'PolymerElements/iron-form',
    },
    {
        name: 'paper-input',
        repository: 'PolymerElements/paper-input',
    },
    {
        name: 'paper-toast',
        repository: 'PolymerElements/paper-toast',
    },
    {
        name: 'paper-button',
        repository: 'PolymerElements/paper-button',
    },
];