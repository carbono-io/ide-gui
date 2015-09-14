// External dependencies
var socketIo = require('socket.io-client');
var Message  = require('carbono-json-messages');
var Q        = require('q');

var config = require('./config');

// Declare variable to store the socket
var socket;

/**
 * Object to hold all requests
 * Keys are request ids
 * values are objects describing the request
 * @type {Object}
 */
var _requestsStore = {};

// Connect to code-machine
config.getCodeMachineLocation().then(function (location) {

    socket = socketIo(location);
});

/**
 * Inserts an element
 */
exports.insertElement = function (path, element) {

    if (!socket) {
        throw new Error('Code machine socket not found');
    }

    console.info('service:code-machine:insertElement');
    console.log(path);
    console.log(element);

    // Create a deferred object
    var defer = Q.defer();

    var insert = {
        path: {
            file: 'src/index.html',
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
