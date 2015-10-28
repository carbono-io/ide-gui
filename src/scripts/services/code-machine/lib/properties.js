'use strict';

/**
 * Defines some special and important properties onto the code-machine prototype
 */

function _setProhibited(prop) {

    return function () {
        throw new Error(prop + ' is read only');
    }
}

module.exports = function (CodeMachineClient) {

    /**
     * Location of the socket.io server
     */
    Object.defineProperty(CodeMachineClient.prototype, 'socketLocation', {
        get: function () {
            return this.config.location;
        },

        set: _setProhibited('socketLocation'),
    })

    /**
     * Base URL for the marked resources.
     */
    Object.defineProperty(CodeMachineClient.prototype, 'resourcesLocation', {
        get: function () {
            return this.config.location + '/marked';
        },

        set: _setProhibited('resourcesLocation'),
    });

    Object.defineProperty(CodeMachineClient.prototype, 'entryFileLocation', {
        get: function () {
            return this.config.entryFile ? 
                this.resourcesLocation + '/' + this.config.entryFile :
                this.resourcesLocation + '/index.html';
        }
    })

    /**
     * Base URL for the clean resources
     */
    Object.defineProperty(CodeMachineClient.prototype, 'cleanResourcesLocation', {
        get: function () {
            return this.config.location + '/clean';
        },

        set: _setProhibited('cleanResourcesLocation'),
    });
};