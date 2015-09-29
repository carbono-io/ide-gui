'use strict';

/**
 * Handles all communication with code-machine service
 */

// native dependencies
var util = require('util');

// external dependencies
var socketIo = require('socket.io-client');
var Message  = require('carbono-json-messages');
var Q        = require('q');

// internal dependencies
var SocketRequestManager = require('./lib/socket-request-manager');

var REQUIRED_CONFIGS = ['location', 'userService'];

/**
 * The class
 * @param {POJO} config Configuration object
 *                      - location: location of the code-machine server
 */
function CodeMachineClient(config) {

    REQUIRED_CONFIGS.forEach(function (configName) {
        if (!config[configName]) {
            var msg = util.format('`%s` is required for CodeMachineClient', configName);
            throw new Error(msg);
        }
    });

    this.config = config;

    this.socket = socketIo(config.location);

    // Instantiate socket request manager
    this.socketRequestManager = new SocketRequestManager(this.socket);
}

/**
 * Inserts an element
 */
// CodeMachineClient.prototype.insertElement = function (path, element) {

//     var insert = {
//         path: {
//             file: 'src/index.html',
//             xpath: path.xpath,
//         },
//         html: element.html,
//         components: element.components || []
//     };

//     return this.socketRequestManager.sendCommand('insertElement', [insert]);
// };

var _requestsStore = {};

CodeMachineClient.prototype.insertElement = function (path, element) {

    var socket = this.socket;

    if (!socket) {
        throw new Error('Code machine socket not found');
    }

    console.info('[service] code-machine:insertElement(%s, %s)', path);

    // Create a deferred object
    var defer = Q.defer();

    var insert = {
        path: {
            file: '/index.html',
            xpath: path.xpath,
        },
        html: element.html,
        components: element.components || []
    };

    // Create request object
    var request = new Message({ apiVersion: '1.0' });
    request.setData({ items: [insert] });

    /**
     * TODO: create ID locally
     * add prefix in order to assure request 
     * is unique to this client connection
     */
    // Store request object
    _requestsStore[request.id] = {
        request: request,
        defer: defer
    };

    socket.emit('command:insertElement', request.toJSON());

    socket.on('command:insertElement/success', function (res) {

        // Parse if is a string, else use the value
        res = typeof res === 'string' ? JSON.parse(res) : res;

        // Retrieve corresponding defer
        var requestData = _requestsStore[res.id];

        if (!requestData) {
            console.warn('code-machine:request not found ' + res.id);
        } else {
            requestData.defer.resolve(res);
        }
    });

    socket.on('command:insertElement/error', function (res) {

        /**
         * TODO: on error, original request id is not being returned.
         */

        // Retrieve corresponding defer
        // var requestData = _requestsStore[res.id];

        // console.warn('code-machine:request not found ' + res.id);
        defer.reject(res);
    });

    // Return the promise :)
    return defer.promise;
};

// export the class
module.exports = CodeMachineClient;
