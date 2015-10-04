'use strict';

/**
 * All methods related to integration with the code-machine service
 */

/**
 * Properties that demand external communication
 * @type {Object}
 */
exports.properties = {

    /**
     * The codeMachineClient
     * @type {Object}
     */
    codeMachine: {
        type: Object,
        notify: true
    },
};

/**
 * Insert component
 */
exports.insertComponent = function (componentData) {

    console.info('<carbo-components-palette>.insertComponent');

    // keep reference to all objects we may use throughout the operation
    var codeMachine = this.codeMachine;
    var canvas      = this.canvas;

    // retrieve data about the currently focused element
    var focusedElementData = this.get('focusedElementData');

    // retrieve the selector for the insertion element for the component
    // The component's template should not be inserted 
    // always at the root of the object, but sometimes 
    // it may be inserted at a child element.
    // Thus, each component may define an insertioncontext
    var insertionElementSelector = componentData.context.insertion[focusedElementData.tagName];

    // Check for required values
    if (!codeMachine) {
        throw new Error('No codeMachine for <carbo-components-palette>.insertComponent');
    }

    if (!canvas) {
        throw new Error('No canvas for <carbo-components-palette>.insertComponent');
    }

    if (!focusedElementData) {
        throw new Error('No focusedElementData for <carbo-components-palette>.insertComponent');
    }

    if (!componentData) {
        throw new Error('No componentData for <carbo-components-palette>.insertComponent');
    }

    return this.getInsertionElementData(insertionElementSelector)
        // install bower dependencies and insert html
        .then(function (insertionElementData) {

            // get the first. we still do not have multiple insertion points
            insertionElementData = insertionElementData[0];

            // Path data
            var insertPath = {
                uuid: insertionElementData.attributes['carbono-uuid'],
            };

            // Element data
            var insertElement = {
                html: componentData.html,

                // bower dependencies
                components: componentData.components
            };

            return codeMachine.insertElement(insertPath, insertElement)
        })
        // check if there is a need for an entity
        .then(function (res) {
            // element html was inserted,
            // now create the entities.json entry if it is needed
            
            if (componentData.requiresEntity) {
                var entityName = 'formulario_' + _.uniqueId();

                var entitySchema = {
                    'campo1': 'String',
                    'campo2': 'String'
                };

                return codeMachine.createEntityFromSchema(entityName, entitySchema);
            }

        });
};