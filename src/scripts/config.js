var Q = require('q');

// MOCK

var _configs = {
    codeMachineLocation: 'https://localhost:8000',
    componentsRegistryLocation: 'https://localhost:8001',
    userServiceLocation: 'https://localhost:8002'
};

// MOCK

module.exports = function () {
    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve(_configs);

    }, 1000);

    return defer.promise;
};