'use strict';
// jshint unused:false

(function () {

    // Load behaviors
    var CodeMachineIntegrationBehavior = require('./scripts/behaviors/code-machine-integration');
    var CanvasIntegrationBehavior      = require('./scripts/behaviors/canvas-integration');
    var ComponentPreview               = require('./scripts/behaviors/component-preview');
    
    Polymer({
        is: 'carbo-components-palette',

        behaviors: [
            CodeMachineIntegrationBehavior,
            CanvasIntegrationBehavior,
            ComponentPreview
        ],

        properties: {

            canvas: {
                type: Object,
                notify: true,
                observer: '_handleCanvasComponentChange',
            },

            state: {
                type: String,
                notify: true,
            },

            /**
             * The componentsRegistryClientService
             * @type {Object}
             */
            componentsRegistry: {
                type: Object,
                notify: true
            },

            /**
             * The element that has focus
             * @type {Object}
             */
            focusedElementData: {
                type: Object,
                notify: true,
                observer: '_handleContextElementChange'
            }
        },

        // Used for setting up event listeners onto the canvas component
        _handleCanvasComponentChange: function (canvas, oldCanvas) {
            console.log('canvas changed');
        },

        _handleContextElementChange: function (focusedElementData, oldContext) {

            this.componentsRegistry.read({
                context: focusedElementData.tagName
            })
            .then(function (components) {
                this.set('components', components);
            }.bind(this))
            .fail(function (err) {
                console.warn('failed to read components from registry');

                throw err;
            }.bind(this))
            .done();
        },

        handleComponentClick: function (event) {

            // get the component data related to the clicked item
            var componentData = event.model.item;

            // keep reference to canvas
            var canvas = this.canvas;

            this.insertComponent(componentData)
                .then(function happiness() {
                    // now everything is finished
                    canvas.deactivateLoading();
                    canvas.reload();
                    // stop loading
                    this.toggleLoading(false);
                }.bind(this))

                // handle failures together for now
                .fail(function sadness(err) {

                    canvas.reload();
                    canvas.deactivateLoading();

                    this.toggleLoading(false);

                    // TODO: remove this
                    // this was done only for user-testing purposes
                    err = _.isString(err) ? JSON.parse(err) : err;
                    if (err.error.code === 999) {
                        console.warn('that 999 error happened, but we\'ll just ignore ;)')
                    } else {
                        this.toggleError(true);
                        throw err;
                    }
                }.bind(this))
                .done();

            this.toggleLoading(true);
            this.toggleError(false);

            canvas.activateLoading();
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

        matchesSearch: function (component) {

            var matches = true;

            // console.log(component);

            return matches;
        },
    });

})();
