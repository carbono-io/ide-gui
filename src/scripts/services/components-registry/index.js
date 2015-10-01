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

        // Check if component.context is an array
        if (_.isArray(component.context)) {
            // if it is an array perform direct comparison
            contextFilter = _.contains(component.context, query.context);

        } else if (_.isArray(component.context.show)) {
            // perform comparison agains the 'show' context
            contextFilter = _.contains(component.context.show, query.context);
        } else {
            throw new Error('No context available for ' + component.title);
        }

        return contextFilter;
    });

    return res;

};

// export the client class
module.exports = ComponentsRegistryClient;
