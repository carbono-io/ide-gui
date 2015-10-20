'use strict';
// jshint unused:false

// Load behaviors
var CodeMachineIntegrationBehavior = require('./scripts/behaviors/code-machine-integration');
var CanvasIntegrationBehavior      = require('./scripts/behaviors/canvas-integration');
var ComponentPreview               = require('./scripts/behaviors/component-preview');
var I18N                           = require('../../scripts/global-behaviors/i18n');

Polymer({
    is: 'carbo-components-palette',

    behaviors: [
        CodeMachineIntegrationBehavior,
        CanvasIntegrationBehavior,
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
    computeUniqueId: function( id , index){
        return (id + index);
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
                 
                canvas.reload().then(function(){
                    setTimeout(function(){
                        window.toggleLoadingComponent(false); 
                    },1000);
                });
                // stop loading
//                this.toggleLoading(false);
               


            }.bind(this))

            // handle failures together for now
            .fail(function sadness(err) {

                canvas.reload();
                canvas.deactivateLoading();

//                this.toggleLoading(false);
                window.toggleLoadingComponent(false);


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

//        this.toggleLoading(true);
        window.toggleLoadingComponent(true);

        this.toggleError(false);

        canvas.activateLoading();
    },

    /**
     * Toggles loading status
     * @param  {Boolean} loading 
     */

// PAT COMENTOU ISSO PARA COLOCAR NO INDEX:

//    toggleLoading: function (loading) {
//        Polymer.Base.toggleClass('loading', loading, this.$.wrapper);
//        Polymer.Base.toggleClass('');
//    },

    /**
     * Toggles error status
     * @param  {Boolean} error 
     */
    toggleError: function (error) {
        Polymer.Base.toggleClass('error', error, this.$.wrapper);
    },

    handleComponentMouseEnter: function(event) {
        //find the tooltip and image inside component 

        var targetId = event.currentTarget.id;
        var tooltip = event.currentTarget.parentElement.querySelector("#tooltip-for-"+event.currentTarget.id);
        var image = tooltip.querySelector("img");

        var doit = (parseInt(image.height) / 2) > (window.innerHeight - event.target.offsetTop);
        console.log("doit", doit);
        //wait for image to load
        _.delay(function(){
            if(doit){

                var top = ((tooltip.offsetHeight - window.innerHeight )>0) ? 
                          (tooltip.offsetHeight - window.innerHeight ):
                          (tooltip.offsetHeight - window.innerHeight )*-1;

                //make the bottom of tooltip to be half of image size to allwas show up.
                var newStyle = tooltip.attributes.style.value.split(';')[0]+";"+
                                "top:"+(top - 50)+"px;";
                console.log(newStyle);
                tooltip.setAttribute("style", newStyle);
               
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
