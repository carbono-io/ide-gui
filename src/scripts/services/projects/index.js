'use strict';

/**
 * Operations regarding the backend related to project
 * management
 */

// native dependencies
var util = require('util');

// external dependencies
var Q       = require('q');
var Message = require('carbono-json-messages');

// array of required configurations for the service
var REQUIRED_CONFIGS = ['location', 'userService'];

//////////
// Mock //
//////////

var mockData = require('./mock-data');

var PROJECT_LOADED = false;

function _loadProjectData(cb) {

    if (PROJECT_LOADED) {
        cb(mockData.project);
    } else {
        PROJECT_LOADED = true;
        setTimeout(function () {

            cb(mockData.project);

        }, 2000);
    }
}

function _createProject(cb) {
    setTimeout(function () {

        cb(mockData.project);
    }, 2000);
}

//////////
// Mock //
//////////

/**
 * Class responsible for dealing with the projects service.
 */
function ProjectsServiceClient(config) {

    REQUIRED_CONFIGS.forEach(function (configName) {
        if (!config[configName]) {
            var msg = util.format('`%s` is required for ProjectsServiceClient', configName);
            throw new Error(msg);
        }
    });

    this.config = config;
}

/**
 * Creates a new project
 * @return {Promise -> POJO} [description]
 */
ProjectsServiceClient.prototype.create = function (projectData) {
    var defer = Q.defer();

    _createProject(defer.resolve);

    return defer.promise;
};

/**
 * Reads data on multiple projects
 * @return {Promise -> Array} [description]
 */
ProjectsServiceClient.prototype.read = function (query) {

};

/**
 * Reads a single entry by id
 * @return {Promise -> POJO} 
 */
ProjectsServiceClient.prototype.readById = function (id) {
    var defer = Q.defer();

    _loadProjectData(defer.resolve);

    return defer.promise;
};

// export class
module.exports = ProjectsServiceClient;
