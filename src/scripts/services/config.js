var Q = require('q');

/**
 * Mock
 */
exports.getCodeMachineLocation = function () {
    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve('http://localhost:8000');

    }, 1000);

    return defer.promise;
};
