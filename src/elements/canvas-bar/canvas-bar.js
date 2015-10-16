'use strict';

// MODES
var CONSTANTS = {};
CONSTANTS.ideModes = {
    graphicalEdition: 'graphical-edition',
    codeEdition: 'code-edition',
    navigation: 'navigation'
};

var I18N = require('../../scripts/global-behaviors/i18n');

Polymer({
    is: "carbo-canvas-bar",
    properties: {

        ideMode: {
            type: String,
            value: CONSTANTS.ideModes.graphicalEdition,
            notify: true
        },

        /**
         * The body component
         * @type {Object}
         */
        body: {
            type: Object,
            notify: true,
            observer: '_handleBodyChange',
        },

        canvas: {
            type: Object,
            notify: true,
        },

        codeMachine: {
            type: Object,
            notify: true,
        },
    },

    behaviors: [
        I18N,
    ],

    addNewPage: function(){

        var page  = prompt("qual o nome da nova pagina?"); 
        var param  = prompt("qual o nome da nova pagina?"); 
        var paramteste  = prompt("qual o nome da nova pagina?"); 
        this.canvas.getElementsData("iron-pages")
        .then(function(ironPagesData){
            
            
        var parentUuid    = ironPagesData[0].attributes['carbono-uuid'],
            html          ='<div page="'+page+'" param="'+param+'"><h3>Pages</h3><span> nome:'+page+'</span><span> paramentro:{{'+param+'}}</span></div>';
           
            return this.codeMachine.insertElement(
                {uuid:ironPagesData[0].attributes['carbono-uuid']} , {html:html});

        }.bind(this))
        .then(function(res){

            components.canvas.reload("http://localhost:8000/resources/marked/index.html").then(function(){

                components.canvas.reload("http://localhost:8000/resources/marked/index.html#/"+page+"/"+paramteste);
            
            });

        }.bind(this));
    },

    animation:{ 
        "entry": [{"name": "fade-in-animation", "timing": {"delay": 0}}]
    },

    observers: [
        '_handleCanvasPanelStateChange(canvasPanelState)'
    ],


    
    changeTooltipMargin: function(event){
        var tooltip = event.target.parentElement.querySelector("[for='"+event.target.id+"']");
        var btn = event.target;
        setTimeout(function(){
            tooltip.setAttribute("style", "left:"+btn.offsetLeft+"px;top:-32px;");
        }, 1);
    },
    /**
     * Function to be executed once the component is ready
     *
     * Set up event listeners for keyboard shortcuts
     * 
     * Shift+G: graphical-edition-editionMode
     * Shift+C: code-edition-editionMode
     * Shift+N: navigation-editionMode
     */
    created: function () {

        // use keypress
        var listener = new window.keypress.Listener();

        listener.simple_combo('shift g', this.setMode.bind(this, CONSTANTS.ideModes.graphicalEdition));
        listener.simple_combo('shift c', this.setMode.bind(this, CONSTANTS.ideModes.codeEdition));
        listener.simple_combo('shift n', this.setMode.bind(this, CONSTANTS.ideModes.navigation));
    },

    _handleBodyChange: function (body, old) {
        body.addEventListener('change-sections-layout', function (event) {
            this.set('canvasPanelState', event.detail.canvasPanel);
        }.bind(this));
    },

    /**
     * Sets the canvas mode to a given mode
     */
    setMode: function (ideMode) {
        console.log('carbo-canvas-bar setting ideMode to ' + ideMode);
        this.set('ideMode', ideMode);
    },

    /**
     * Toggles the open and close of canvasPanel
     */
    toggleCanvasPanel: function () {

        if (!this.body) {
            throw new Error('No body available for <carbo-canvas-bar>.toggleCanvasPanel');
        }

        if (this.get('canvasPanelState') === 'open') {
            this.body.closeCanvasPanel();
        } else {
            this.body.openCanvasPanel();
        }
    },

    /**
     * Handles changes on the canvasPanelState
     *
     * TODO: not good implementation yet.
     */
    _handleCanvasPanelStateChange: function (canvasPanelState) {

        var toggle = this.$['canvas-panel-toggle'];
        var isActive = (canvasPanelState === 'open');

        Polymer.Base.toggleClass('active', isActive, toggle);
    },
});
