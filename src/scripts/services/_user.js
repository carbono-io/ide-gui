/**
 * Operations related to user management
 *
 * Authentication and authorization as well
 */

// external dependencies
var Q       = require('q');
var Message = require('carbono-json-messages');

var USER_IS_LOGGED = false;

// Mock

function _login(strategy, userData, cb) {
    setTimeout(function () {
        cb(userData);
    }, 3000);
}

function _can(projectId, permission, cb) {
    setTimeout(function () {
        cb(true);
    }, 3000);
}

// Mock

/**
 * Log a given user into the platform
 * @param  {String} strategy 
 *         The strategy to be used to log the user in (basic, github*, facebook*)
 *         * = unsupported at the moment
 * @param  {POJO} userData
 *         - username
 *         - 
 * @return {Promise -> POJO {UserData}}
 *         Returns a promise that on success returns the logged user data.
 */
exports.login = function (strategy, userData) {
    var defer = Q.defer();

    _login(strategy, userData, defer.resolve);

    return defer.promise;
};

/**
 * Checks if the user is logged
 * Takes no arguments.
 * @return {Promise -> Boolean}
 */
exports.isLogged = function () {
    var defer = Q.defer();

    defer.resolve(USER_IS_LOGGED);

    return defer.promise;
};

/**
 * Checks whether the user has access to a given project
 * @param  {String}  projectId 
 *         id of the project
 * @param  {Array|String|Null} permissions
 *         Array of strings for
 * @return {Promise -> Boolean}
 */
exports.can = function (projectId, permissions) {
    var defer = Q.defer();

    _can(projectId, permissions, defer.resolve);

    return defer.promise;
};