'use strict';
// jshint unused:false

// Load behaviors
var CodeMachineIntegrationBehavior = require('./scripts/behaviors/code-machine-integration');
var CanvasIntegrationBehavior      = require('./scripts/behaviors/canvas-integration');
var InquirerIntegrationBehavior    = require('./scripts/behaviors/inquirer-integration');
var ComponentPreview               = require('./scripts/behaviors/component-preview');
var I18N                           = require('../../scripts/global-behaviors/i18n');

Polymer({
    is: 'carbo-components-palette',

    behaviors: [
        CodeMachineIntegrationBehavior,
        CanvasIntegrationBehavior,
        InquirerIntegrationBehavior,
        ComponentPreview,
        I18N,
    ],

    properties: {

        canvas: {
            type: Object,
            notify: true,
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
            observer: 'reloadComponents'
        }
    },

    /**
     * Reloads the components
     * @return {[type]} [description]
     */
    reloadComponents: function () {

        var focusedElementData = this.get('focusedElementData');

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

    /**
     * Make a uniqueId to handle hover for paper tooltip 
     * @param  {index} index of element in dom-repeat 
     */
    computeUniqueId: function(index){
        return ("component" + index);
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
        //find the tooltip and image inside component 
        var tooltip = event.currentTarget.querySelector(".preview");
        var image = tooltip.querySelector("img");
        
        //wait for image to load
        _.delay(function(){
            if(tooltip.style.top === "auto"){
                //make the bottom of tooltip to be half of image size to allwas show up.
                tooltip.style.bottom = (parseInt(image.height) / 2) + "px" ;
            }
         }, 200); 

    },

    matchesSearch: function (component) {

        var matches = true;

        // console.log(component);

        return matches;
    },

    /**
     * Retrieves translated value for component registry entries.
     */
    getTranslatedValue: function (item, language, key) {

        var i18n = item.i18n;

        if (
            language &&
            i18n && 
            i18n[language] &&
            i18n[language][key]
        ) {
            return i18n[language][key];
        } else {
            return item[key];
        }
    },
});
