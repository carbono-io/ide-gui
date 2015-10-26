/**
 * The MIT License (MIT)
 * Copyright (c) 2015 Fabrica de Aplicativos S/A
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */
'use strict';

// load client-side scripts that we depend upon
require('./bower_components/webcomponentsjs/webcomponents-lite.js');

// load initialization scripts
var initServices    = require('./scripts/initialization/services');
var initComponents  = require('./scripts/initialization/components');
var initRouter      = require('./scripts/initialization/router');
var initGlobalScope = require('./scripts/initialization/global-scope');

// Read configurations
var readConfig = require('./scripts/config');

// The application wrapper
var carbo = document.querySelector('#carbo');

// Set placeholder data onto the main scope of the application
require('./scripts/placeholder-data')(carbo);




//PAT INSERIU ISSO AQUI PARA INSERIR O LOADING
window.toggleLoadingComponent =  function(loading) {

    var canvasWrapper = document.getElementById('canvaswrapper');
    var ideContainer = document.getElementById('container');
    var loadingComponent = canvasWrapper.querySelector('#loading');

    ideContainer.classList.toggle("loadingcomponent", loading);

    loadingComponent.style.visibility= "visible";

    if (loading) {

        canvasWrapper.classList.toggle("loadingcomponent", loading);

    } else {

        canvasWrapper.classList.toggle("loadingcomponent", loading);

        setTimeout(function(){
            loadingComponent.style.visibility= "hidden";
        },1502);

    }

};

// Only start setting up thing when WebComponentsReady event is fired
window.addEventListener('WebComponentsReady', function () {

    readConfig().then(function (config) {

        // Services
        var services   = initServices(carbo, config);        
        // Components
        var components = initComponents(carbo, config);
        // Router
        var router     = initRouter(carbo, config, services, components);
        // Set up global scope
        initGlobalScope(carbo, config, services, components);

        // if configuration for env is 'development',
        // initialize developer tools
        if (config.env === 'development') {
            require('./scripts/development')(carbo, config, services, components);
        }

        // Reference to the carbono itself
        carbo.context = carbo;
    })
    .done();
});

// Export the component scope
module.exports = carbo;
