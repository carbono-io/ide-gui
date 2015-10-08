'use strict';

/**
 * Deals with all interactions with the CodeMachineServiceClient
 */

var util = require('util');

/**
 * Make sure there is a codeMachine instance passed to the element.
 * @type {Object}
 */
exports.properties = {
    codeMachine: {
        type: Object,
        notify: true,
        observer: '_handleCodeMachineChange'
    },
};

/**
 * Helper function that simply extracts the innerHTML from an HTML string
 * @param  {String} fullHTML The HTML String
 * @return {String}          The InnerHTML
 */
function _extractInnerHTML(fullHTML) {

    var fakeElement = document.createElement('div');
    fakeElement.innerHTML = fullHTML;

    return fakeElement.childNodes[0].innerHTML;
}

/**
 * Handles whenever the codeMachine property changes.
 *
 * Sets up listeners for events on the codeMachine service.
 * 
 * @param  {CodeMachineServiceClient} codeMachine    [description]
 * @param  {CodeMachineServiceClient} oldCodeMachine [description]
 */
exports._handleCodeMachineChange = function (codeMachine, oldCodeMachine) {

    // Hanlde control:contentUpdate events, 
    // which basically are fired everytime any changes are made 
    // to the html.
    codeMachine.on('control:contentUpdate', function (data) {

        // Build up a selector for the element that changed
        var selector = util.format('[carbono-uuid="%s"]', data.elementUuid);
        var content = _extractInnerHTML(data.content);

        // first get data on the target element
        this.getElementsData(selector)
            .then(function (elementsData) {

                // setTimeout(this.reload.bind(this), 100);

                // if (elementsData[0].tagName === 'HEAD') {
                //     console.log('modification on HEAD, reload required');

                // } else if (elementsData[0].tagName === 'BODY') {
                //     console.log('modification on BODY, reload required');

                //     // TODO: improve this.
                //     setTimeout(this.reload.bind(this), 100);
                // } else {
                //     this.executeInspectorOperation('replaceInnerHTML', [selector, content]);
                // }
            }.bind(this))
            .done();

    }.bind(this));
};
