// External dependencies
var page           = require('page');
var socketIOClient = require('socket.io-client');

/**
 * Checks whether the router has been initialized.
 */
var ROUTER_INITIALIZED = false;

// Mock data
var project = {
    projectId: '340987612301',
    containerId: 'lalala',
    host: '192.168.99.100',
    ports: {
        '8000': '32772'
    },
    // projectUrl: '/sandbox/base-polymer-project/src/index.html',
    projectUrl: 'http://localhost:8000/resources/marked/src/index.html',
};

function createNewProject(callback) {
    
    // mock request timer
    setTimeout(function () {
        callback(project);
    }, 2000);
}

function loadProject(callback) {
    setTimeout(function () {
        callback(project);
    }, 1000);
}

/**
 * Function to be executed only when webcomponents are ready.
 * Bear in mind that this event requires webcomponents-lite.js
 * to have been imported into the application.
 *
 * Receives a reference to the main scope of the application.
 */
function initializeRouter(carbo) {

    // We use Page.js for routing. This is a Micro
    // client-side router inspired by the Express router
    // More info: https://visionmedia.github.io/page.js/
    page('/', function () {
        carbo.route = 'start';
    });

    require('./project')(carbo);

    // add #! before urls
    page({
        hashbang: true
    });

}

/**
 * Export a function that initializes a router
 * and returns reference to it.
 */
module.exports = function (carbo) {

    if (!ROUTER_INITIALIZED) {
        // Only initialize the router once.
        initializeRouter(carbo);
    }

    return page;
};
