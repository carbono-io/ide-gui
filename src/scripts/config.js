'use strict';

/**
 * Function to read configurations
 * Reads all configurations for all services and the application
 * as a whole.
 */

var Q = require('q');

// MOCK

var _configs = {
    // development environment
    env: 'development',
    codeMachineWsLocation: 'http://hom.api.carbono.io/mc/cm-ws/57929f8d-f173-4197-a670-84563dbb856e/',
    componentsRegistryLocation: 'http://localhost:8001',
    userServiceLocation: 'http://localhost:8002',
    projectsServiceLocation: 'http://localhost:8003'
};

// MOCK

// export a function that reads the configurations
module.exports = function () {
    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve(_configs);

    }, 500);

    return defer.promise;
};
