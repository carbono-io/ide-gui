var Message = require('carbono-json-messages');
var Q       = require('q');

/**
 * Class that handles command sending and response
 * @param {[type]} socket [description]
 */
function SocketRequestManager(socket) {

    this.socket = socket;

    socket.on('command:success', this._handleCommandSuccess.bind(this));
    socket.on('command:error', this._handleCommandError.bind(this));

    // Hash onto which requests are stored
    this._requestStore = {};
};

/**
 * Handles command success
 */
SocketRequestManager.prototype._handleCommandSuccess = function (res) {

    // Parse if is a string, else use the value
    res = typeof res === 'string' ? JSON.parse(res) : res;

    // Retrieve corresponding defer
    var requestData = this.retrieveRequest(res.id);

    if (!requestData) {
        console.warn('code-machine:request not found ' + res.id);
    } else {
        requestData.defer.resolve(res);

        // Remove requestData
        this.removeRequest(res.id);
    }

};

/**
 * Handles all error events
 */
SocketRequestManager.prototype._handleCommandError = function (res) {

    // Parse if is a string, else use the value
    res = typeof res === 'string' ? JSON.parse(res) : res;

    /**
     * TODO: on error, original request id is not being returned.
     */

    // Retrieve corresponding defer
    var requestData = this.retrieveRequest(res.id);

    console.warn('code-machine:request not found ' + res.id);
    defer.reject(res);

};

/**
 * Sends command
 * @return {[type]} [description]
 */
SocketRequestManager.prototype.sendCommand = function (commandName, items) {

    if (!this.socket) {
        throw new Error('Too bad: SocketRequestManager.sendCommand could not retrieve socket connection.');
    }

    // create a defer object for the command execution
    var defer = Q.defer();

    var requestMessage = new Message();
    requestMessage.setData({
        items: items
    });

    // Store requestMessage
    this.storeRequest(requestMessage.id, {
        defer: defer,
        message: requestMessage,
    });

    // emit event to start it all
    this.socket.emit('command:' + commandName, requestMessage.toJSON());

    // return the promise
    return defer.promise;
};



SocketRequestManager.prototype.storeRequest = function (reqId, reqData) {
    this._requestStore[reqId] = reqData;
};

SocketRequestManager.prototype.retrieveRequest = function (reqId) {
    // TODO deal with errors
    return this._requestStore[reqId];
};

SocketRequestManager.prototype.removeRequest = function (reqId) {
    delete this._requestStore[reqId];
};

// export class
module.exports = SocketRequestManager;