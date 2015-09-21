/**
 * Operations regarding the backend related to project
 * management
 */

var Q       = require('q');
var Message = require('carbono-json-messages');

var config = require('../config');

// Mock data
var mockProjectData = {
    projectId: '340987612301',
    containerId: 'lalala',
    host: '192.168.99.100',
    ports: {
        '8000': '32772'
    },
    // projectUrl: '/sandbox/base-polymer-project/src/index.html',
    projectUrl: 'http://localhost:8000/resources/marked/src/index.html',
};

var PROJECT_LOADED = false;

function _loadProjectData(cb) {

    if (PROJECT_LOADED) {
        cb(mockProjectData);
    } else {
        PROJECT_LOADED = true;
        setTimeout(function () {

            cb(mockProjectData);

        }, 3000);
    }
}

function _createProject(cb) {
    setTimeout(function () {

        cb(mockProjectData);
    }, 5000);
}


/**
 * Creates a new project
 * @return {Promise -> POJO} [description]
 */
exports.create = function () {
    var defer = Q.defer();

    _createProject(defer.resolve);

    return defer.promise;
};

/**
 * Reads data on multiple projects
 * @return {Promise -> Array} [description]
 */
exports.read = function () {
    var defer = Q.defer();

    _loadProjectData(function (projectData) {
        defer.resolve([projectData]);
    });

    return defer.promise;
};

/**
 * Reads a single entry by id
 * @return {Promise -> POJO} 
 */
exports.readById = function (id) {
    var defer = Q.defer();

    _loadProjectData(defer.resolve);

    return defer.promise;
};

/**
 * Update a project
 * @return {Promise -> POJO} [description]
 */
exports.update = function () {
    var defer = Q.defer();


    return defer.promise;
};

/**
 * Delete a project
 * @return {Promise -> POJO} [description]
 */
exports.delete = function () {
    var defer = Q.defer();


    return defer.promise;
};
