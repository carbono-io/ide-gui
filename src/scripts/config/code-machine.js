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
exports.getSocketIOConnectionLocation = function (projectId) {
    aux.validateArguments(
        ['projectId needed for config.codeMachine.getSocketIOConnectionLocation'],
        arguments
    );

    return CODE_MACHINE_BASE + '/' + projectId;
};

/**
 * Builds the marked resources url
 * @param {String} projectId The id of the project being edited
 * @return {URL}             The base url for retrieving marked resources
 */
exports.getMarkedResourcesBaseLocation = function (projectId) {
    aux.validateArguments(
        ['projectId needed for config.codeMachine.getMarkedResourcesBaseLocation'],
        arguments
    );

    return CODE_MACHINE_BASE + '/' + projectId + '/resources/marked'; 
};

/**
 * Builds the clean resources url
 * @param  {String} projectId The id of the project being edited
 * @return {URL}              The base url for retrieving clean resources
 */
exports.getCleanResourcesBaseLocation = function (projectId) {
    aux.validateArguments(
        ['projectId needed for config.codeMachine.getCleanResourcesBaseLocation'],
        arguments
    );

    return CODE_MACHINE_BASE + '/' + projectId + '/resources/clean';
};
