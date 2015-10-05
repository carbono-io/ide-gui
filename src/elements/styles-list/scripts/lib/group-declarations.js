'use strict';

/**
 * Script that separates the declarations into groups
 */

var DECLARATION_GROUPS = {
    'background-color': 'background',
    'background-image': 'background',
    'border-width': 'border',
    'border-color': 'border',
    'border-style': 'border',
    'color': 'color',
    'opacity': 'color',

    'font-family': 'font',
    'font-style': 'font',
    'font-variant': 'font',
    'font-weight': 'font',
    'font-size': 'font',
};

function buildDeclarationGroups(declarations) {

    var _groups = {};

    declarations.forEach(function (declaration) {

        var dg = DECLARATION_GROUPS[declaration.property] || 'general';

        _groups[dg] = _groups[dg] || {
            name: dg,
            declarations: []
        };

        _groups[dg].declarations.push(declaration);
    });

    // transform into array
    var groups = [];
    _.each(_groups, function (group, name) {
        groups.push(group);
    });

    return groups;
}

module.exports = buildDeclarationGroups;
