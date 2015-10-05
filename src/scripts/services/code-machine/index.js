'use strict';

/**
 * Handles all communication with code-machine service
 */

// native dependencies
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// external dependencies
var socketIo = require('socket.io-client');
var Message  = require('carbono-json-messages');
var Q        = require('q');
var request  = require('superagent');

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

    // inheritance
    EventEmitter.call(this);
    
    // listen to socket events
    this.socket.on('control:contentUpdate', function (eventData) {

        // parse json if needed
        eventData = _.isString(eventData) ? JSON.parse(eventData) : eventData;
        
        // propagate event
        this.emit('control:contentUpdate', eventData.data.items[0]);
    }.bind(this));
}

// Let CodeMachineClient inherit from event emitter
util.inherits(CodeMachineClient, EventEmitter);

/**
 * Inserts an element
 */
// CodeMachineClient.prototype.insertElement = function (path, element) {

//     var insert = {
//         path: {
//             file: 'src/index.html',
//             uuid: path.uuid,
//         },
//         html: element.html,
//         components: element.components || []
//     };

//     return this.socketRequestManager.sendCommand('insertElement', [insert]);
// };

var _requestsStore = {};

/**
 * Inserts element
 */
CodeMachineClient.prototype.insertElement = function (path, element) {

    var socket = this.socket;

    if (!socket) {
        throw new Error('Code machine socket not found');
    }

    console.info(
        '[service] code-machine:insertElement(%s, %s)',
        JSON.stringify(path)
    );

    // Create a deferred object
    var defer = Q.defer();

    var insert = {
        path: {
            file: '/index.html',
            uuid: path.uuid,
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

    socket.once('command:insertElement/success', function (res) {

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

    socket.once('command:insertElement/error', function (res) {

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


var ENTITIES = [];


/**
 * Creates an entity entry in the entities.json file
 * @return {Promise}
 */
CodeMachineClient.prototype.createEntityFromSchema = function (entityName, schema) {
    
    var defer = Q.defer();

    console.info(
        '[service] code-machine:createEntityFromSchema(%s, %s)',
        entityName,
        JSON.stringify(schema)
    );

    var socket = this.socket;

    // data to be sent to codeMachine server
    var data = {
        entityName: entityName,
        schema: schema
    };

    // Create request object
    var request = new Message({ apiVersion: '1.0' });
    request.setData({ items: [data] });

    socket.emit('command:createEntityFromSchema', request.toJSON());

    socket.once('command:createEntityFromSchema/success', function (res) {

        // Parse if is a string, else use the value
        res = typeof res === 'string' ? JSON.parse(res) : res;

        console.log(res);

        // TODO: improve
        ENTITIES.push({
            name: entityName,
            schema: schema
        });
        this.emit('entities-changed', ENTITIES);

        // Retrieve corresponding defer
        var requestData = _requestsStore[res.id];

        if (!requestData) {
            console.warn('code-machine:request not found ' + res.id);
        } else {
            requestData.defer.resolve(res);
        }
    }.bind(this));

    socket.once('command:createEntityFromSchema/error', function (res) {

        defer.reject(res);
    });

    setTimeout(function () {
        defer.resolve();
    }, 1000);

    return defer.promise;
};

/**
 * Binds a component to an entity
 * @return {Promise} 
 */
CodeMachineClient.prototype.bindComponentToEntity = function () {
    var defer = Q.defer();

    console.info(
        '[service] code-machine:bindComponentToEntity(%s, %s)',
        entityName,
        JSON.stringify(schema)
    );

    setTimeout(function () {
        defer.resolve();
    }, 1000);

    return defer.promise;
};

/**
 * Reads a stylesheetJSON
 * @param  {String} stylesheetPath [description]
 * @return {Promise -> CSSJSON}                [description]
 */
CodeMachineClient.prototype.getCSSJSON = function (stylesheetPath) {

    var defer = Q.defer();

    var url = this.config.location + '/resources/marked/' + stylesheetPath + '.json';

    request
        .get(url)
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(res.body);
            }
        });

    return defer.promise;
};

CodeMachineClient.prototype.writeCSS = function (editionPath, value) {
    
    var defer = Q.defer();

    var socket = this.socket;

    // data to be sent to codeMachine server
    var data = {
        path: editionPath,
        value: value,
    };

    // Create request object
    var request = new Message({ apiVersion: '1.0' });
    request.setData({ items: [data] });

    socket.emit('command:writeCSS', request.toJSON());

    socket.once('command:writeCSS/success', function () {
        defer.resolve();
    });

    socket.once('command:writeCSS/error', function (err) {
        defer.reject(err);
    });


    return defer.promise;  
};

// export the class
module.exports = CodeMachineClient;
