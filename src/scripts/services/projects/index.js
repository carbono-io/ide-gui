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

var project = {
    containerId: '666',
    host: 'carbonohost',
    ports: {
        '8000': '32772'
    }};
var urlPrefix = 'http://hom.api.carbono.io/mc/cm/';
var urlSufix  = '/marked/index.html#home';

//////////
// Mock //
//////////

var mockData = require('./mock-data');

var PROJECT_LOADED = false;
var MOCKED         = false;

function _loadProjectData(_id, cb) {
    
    if(!MOCKED){
        project.projectId = _id; 
        project.projectUrl = urlPrefix + _id + urlSufix;
        PROJECT_LOADED = true;
        cb(project);
        return;
    }
    
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
ProjectsServiceClient.prototype.readById = function (_id) {
    var defer = Q.defer();

    _loadProjectData(_id, defer.resolve);

    return defer.promise;
};

// export class
module.exports = ProjectsServiceClient;
