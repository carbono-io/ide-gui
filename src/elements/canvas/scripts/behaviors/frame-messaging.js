exports.ola = function () {
    alert('ola');
};

/**
 * The prefix to be used by all `window.postMessage(iframe, message)`
 * requests.
 * 
 * @type {Constant}
 */
var INSPECTOR_OPERATION_PREFIX = 'canvas_inspector_operation_';

exports.created = function () {
    // Hash to store the deferred
    // for opertaions invoked on the inspector (inside iframe)
    // Keys are uniqueIds and values are the deferred;
    this._inspectorOperationDefers = {};
};

/**
 * Executes and operation inside the iframe.
 * Communicates with the <carbo-inspector> component within the frame
 *
 * Implements the promise interface that makes it possible 
 * to use request-response paradigm in the `window.postMessage` 
 * communication.
 * 
 * @param  {String} operation The name of the operation to be executed.
 * @param  {Array|*} args     Array of arguments or single argument.
 * @return {Promise}          Promise to be resolved after the response.
 */
exports.executeInspectorOperation = function (operation, args) {
    // Create and id for the operation
    var opid = _.uniqueId(INSPECTOR_OPERATION_PREFIX);

    var message = JSON.stringify({
        id: opid,
        operation: operation,
        args: args
    });            
    
    // Send the message to the iframe -
    this.$.iframe.contentWindow.postMessage(message, '*');

    // Create a deferred object to be returned and store it
    // using the id
    var deferred = Q.defer();
    this._inspectorOperationDefers[opid] = deferred;

    // Create an listener for the response event
    var responseListener = function (event) {
        var response = JSON.parse(event.data);

        // Only resolve deferred if the response id matches
        if (response.id === opid) {
            // Resolve the deferred object
            this._inspectorOperationDefers[opid].resolve(response.res);

            // Remove it from the hash
            delete this._inspectorOperationDefers[opid];

            // Remove the listener after the response has arrived
            window.removeEventListener('message', responseListener);
        }

    }.bind(this);

    window.addEventListener('message', responseListener);

    // Return the promise of the deferred object
    return deferred.promise;
};
