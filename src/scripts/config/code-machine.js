'use strict';

/**
 * Configuration builder for code-machine
 */

// internal dependencies
var aux = require('../auxiliary');

// constants
var CONFIG          = require('./config.json');
var MISSION_CONTROL = 'mc';
var CODE_MACHINE    = 'cm';

var CODE_MACHINE_BASE = CONFIG.apiLocation + '/' + MISSION_CONTROL + '/' + CODE_MACHINE;

/**
 * Builds the url for connecting with code-machine socket.io server
 * @param  {String} projectId The id of the project being edited
 * @return {URL}              The url for connecting
 */
exports.getBaseLocation = function (projectId) {
    aux.validateArguments(
        ['projectId needed for config.codeMachine.getBaseLocation'],
        arguments
    );
    
    // return 'http://localhost:5000/mc/cm/' + projectId;
    return CODE_MACHINE_BASE + '/' + projectId;
};