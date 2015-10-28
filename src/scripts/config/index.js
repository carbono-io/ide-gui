'use strict';

/**
 * Configuration builder
 */

/**
 * Function to read configurations
 * Reads all configurations for all services and the application
 * as a whole.
 */

var Q = require('q');

var MISSION_CONTROL = 'mc';
var CODE_MACHINE    = 'cm';

var CONFIGJSON = require('./config.json');

// MOCK

var _configs = {
    // development environment
    env: 'development',

    codeMachineLocation: 'http://hom.api.carbono.io/code-machine',
    componentsRegistryLocation: 'http://localhost:8001',
    userServiceLocation: 'http://localhost:8002',
    projectsServiceLocation: 'http://hom.api.carbono.io/localhost:8003'
};

// MOCK

// http://hom.api.carbono.io/

// export a function that reads the configurations

window.CF = exports;

var test = function () {
    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve(_configs);

    }, 500);

    return defer.promise;
};

test.codeMachine = require('./code-machine');

module.exports = test;
