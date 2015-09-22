'use strict';

/**
 * Class that deals with connection with the component registry
 */

// native dependencies
var util = require('util');

// external dependencies
var _ = require('lodash');

var REQUIRED_CONFIGS = ['location', 'userService'];

function ComponentsRegistryClient(config) {

    REQUIRED_CONFIGS.forEach(function (configName) {
        if (!config[configName]) {
            var msg = util.format('`%s` is required for ComponentsRegistryClient', configName);
            throw new Error(msg);
        }
    });
    
    this.config = config;
}

var MOCK_REGISTRY = require('./mock-data');

ComponentsRegistryClient.prototype.read = function (query) {

    query = query || {};

    var res = _.filter(MOCK_REGISTRY, function (component) {

        var contextFilter = true;

        if (query.context) {
            contextFilter = _.contains(component.context, query.context);
        }

        return contextFilter;
    });

    return res;

};

// export the client class
module.exports = ComponentsRegistryClient;
