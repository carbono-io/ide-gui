'use strict';

Polymer({
    is: 'carbo-styles-panel',

    properties: {

        // Services
        codeMachine: {
            type: Object,
            notify: true,
            observer: '_handleCodeMachineChange',
        },

        // Components
        canvas: {
            type: Object,
            notify: true,
        },

        // Scope data
        focusedElementData: {
            type: Object,
            notify: true,
            observer: '_handleFocusedElementDataChange',
        },
    },

    listeners: {
        'style-declaration-changed': 'handleStyleDeclarationChanged',
    },

    ready: function () {
        this.set('changedStyles', []);
    },

    handleStyleDeclarationChanged: function (event) {

        var canvas = this.get('canvas');

        if (!canvas) {
            throw new Error('No canvas for handleStyleDeclarationChanged');
        }

        var selectorString = event.detail.selectorString;
        var property = event.detail.declaration.property;
        var value    = event.detail.declaration.value;

        canvas.applyStyle(selectorString, property, value);
    },

    writeCSS: function () {
        this.codeMachine
            .writeCSS({
                file: 'index.css'
            }, this.get('CSS'))
            .then(function () {
                console.log('success')
            }, function (err) {
                throw err;
            })
            .done();
    },

    /**
     * Whenever codeMachine changes, this will handle that,
     */
    _handleCodeMachineChange: function (codeMachine, oldCodeMachine) {

        codeMachine.getCSSJSON('index.css')
            .then(function (CSS) {
                this.set('CSS', CSS);
            }.bind(this))
            .done();
    },

    /**
     * Whenever the focused element changes, the panel should update
     * itself.
     */
    _handleFocusedElementDataChange: function (focusedElementData, old) {

        var canvas = this.get('canvas');
        var self = this;

        // reset the array of editable rules
        this.set('editableRules', []);

        if (!canvas) {
            throw new Error('No canvas for <carbo-styles-panel>._handleFocusedElementDataChange');
        }

        if (focusedElementData) {

            this.CSS.stylesheet.rules.forEach(function (ruleObject) {

                if (ruleObject.type === 'comment') {
                    return;
                }

                ruleObject.selectors.forEach(function (selector) {

                    canvas.elementMatches(focusedElementData._uuidSelector, selector)
                        .then(function (matches) {

                            if (matches) {
                                ruleObject.selectorString = ruleObject.selectors.join(', ');
                                self.push('editableRules', ruleObject);
                            }
                        })
                        .done();

                });

            });
        }
    },

    /**
     * Transforms an array of selectors into a selector string
     * Used for computed binding
     * @param  {Array} selectors
     * @return {String}
     */
    _buildSelectorString: function (selectors) {
        return selectors.join(', ');
    }
});

/**
 * Auxiliary function that extracts an object with properties
 * @param  {[type]} ruleObject [description]
 * @return {[type]}            [description]
 */
function extractPropertyValues(ruleObject) {

    return ruleObject.declarations.reduce(function (properties, declaration) {
        properties[declaration.property] = declaration.value;

        return properties;
    }, {});
}
