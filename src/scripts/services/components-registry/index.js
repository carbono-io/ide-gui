/**
 * Class that deals with connection with the component registry
 */

var REQUIRED_CONFIGS = ['location', 'userService'];

function ComponentsRegistryClient(config) {

    REQUIRED_CONFIGS.forEach(function (configName) {
        if (!config[configName]) {
            throw new Error('`%s` is required for ComponentsRegistryClient', configName);
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