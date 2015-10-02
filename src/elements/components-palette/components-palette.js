'use strict';
// jshint unused:false

(function () {

    // Load behaviors
    var CodeMachineBehavior = require('./scripts/behaviors/code-machine');
    var ComponentPreview    = require('./scripts/behaviors/component-preview');
    
    Polymer({
        is: 'carbo-components-palette',

        behaviors: [CodeMachineBehavior, ComponentPreview],

        properties: {
            codeMachine: {
                type: Object,
                notify: true
            },
            canvas: {
                type: Object,
                notify: true,
                observer: '_handleCanvasComponentChange',
            },

            state: {
                type: String,
                notify: true,
            },

            contextElement: {
                type: Object,
                notify: true,
                observer: '_handleContextElementChange'
            },

            registry: {
                type: Object,
                notify: true
            }
        },

        // Used for setting up event listeners onto the canvas component
        _handleCanvasComponentChange: function (canvas, oldCanvas) {
            console.log('canvas changed');
        },

        _handleContextElementChange: function (contextElement, oldContext) {

            this.set('components', this.registry.read({
                context: contextElement.tagName
            }));
        },

        handleComponentClick: function (event) {

            var component = event.model.item;

            // Check for required services
            if (!this.codeMachine) {
                throw new Error('No codeMachine for carbo-components-palette');
            }

            if (!this.canvas) {
                throw new Error('No canvas for carbo-components-palette');
            }
            // Keep reference to the canvas element
            var canvas = this.canvas;

            var focusedElementData = canvas.get('focusedElementData');

            // retrieve the insertion context for the component
            var insertionContext = component.context.insertion;

            console.log(insertionContext)

            // TODO: handle errors
            // set the insertion focus
            canvas.getFocusTargetData(insertionContext[focusedElementData.tagName])
                .then(function insertElement(insertionElementData) {
                    console.log(insertionElementData);

                    // Path data
                    var insertPath = {
                        uuid: insertionElementData.attributes['carbono-uuid'],
                    };

                    console.log(insertPath);

                    // Element data
                    var insertElement = {
                        html: component.html,
                        components: component.components
                    };


                    // 
                    var entityName = 'formulario_' + _.uniqueId();

                    var entitySchema = {
                        'campo1': 'String',
                        'campo2': 'String'
                    };

                    this.codeMachine
                        .insertElement(insertPath, insertElement)
                        .then(function createEntityFromSchema(res) {
                            // element html was inserted,
                            // now create the entities.json entry if it is needed
                            
                            if (component.requiresEntity) {

                                return this.codeMachine.createEntityFromSchema(entityName, entitySchema);
                            }

                        }.bind(this))
                        // .then(function associateComponentToEntity(res) {
                        //     // entity entry was created,
                        //     // make association
                            
                        //     if (component.requiresEntity) {
                        //         var path = {
                        //             file: '/index.html',
                        //             uuid: 'aaaa'
                        //         }

                        //         return this.codeMachine.bindComponentToEntity()
                        //     }
                        // })
                        .then(function happiness() {
                            // now everything is finished
                            this.canvas.deactivateLoading();
                            canvas.reload();
                            // stop loading
                            this.toggleLoading(false);
                        }.bind(this))

                        // handle failures together for now
                        .fail(function sadness(err) {

                            canvas.reload();
                            this.canvas.deactivateLoading();

                            this.toggleLoading(false);
                            this.toggleError(true);
                            console.log(err);
                            console.log('error! :(');
                        }.bind(this)).done();

                }.bind(this))
                .done();

            this.toggleLoading(true);
            this.toggleError(false);

            this.canvas.activateLoading();
        },

        /**
         * Toggles loading status
         * @param  {Boolean} loading 
         */
        toggleLoading: function (loading) {
            Polymer.Base.toggleClass('loading', loading, this.$.wrapper);
        },

        /**
         * Toggles error status
         * @param  {Boolean} error 
         */
        toggleError: function (error) {
            Polymer.Base.toggleClass('error', error, this.$.wrapper);
        },

        handleComponentMouseOver: function(event) {
            // this.showPreview(event);
        },
    });

})();
