'use strict';

var util = require('util');

exports.properties = {
    codeMachine: {
        type: Object,
        notify: true,
        observer: '_handleCodeMachineChange'
    },
}

function extractInnerHTML(fullHTML) {

    var fakeElement = document.createElement('div');
    fakeElement.innerHTML = fullHTML;

    return fakeElement.childNodes[0].innerHTML;
}

exports._handleCodeMachineChange = function (codeMachine, oldCodeMachine) {

    codeMachine.on('control:contentUpdate', function (data) {

        var selector = util.format('[carbono-uuid="%s"]', data.elementUuid);
        var content = extractInnerHTML(data.content);

        // first get data on the target element
        this.executeInspectorOperation('getElementData', [selector])
            .then(function (elementData) {

                if (elementData.tagName === 'HEAD') {
                    console.log('modification on HEAD, reload required');

                } else if (elementData.tagName === 'BODY') {
                    console.log('modification on BODY, reload required');
                    setTimeout(this.reload.bind(this), 100);
                } else {
                    this.executeInspectorOperation('replaceInnerHTML', [selector, content]);
                }
            }.bind(this))
            .done();


    }.bind(this));
};