'use strict';

/**
 * Script that sets the declaration type
 */

var DECLARATION_TYPES = {
    'background-color': 'color',
    'color': 'color',
    'opacity': 'opacity',

    'font-family': 'font-family',
    
};

function getDeclarationType(declaration) {
    return DECLARATION_TYPES[declaration.property] || 'general';
};

module.exports = getDeclarationType;