/**
 * Defines proxy tasks
 */

// native dependencies
var http = require('http');
var url  = require('url');

// external dependencies
var httpProxy = require('http-proxy');
var express   = require('express');

var codeMachineProxy = httpProxy.createProxyServer({
    target: 'http://localhost:8000',
    ws    : true,
});

var CODE_MACHINE_REGEXP = /\/mc\/cm\/.+?(\/.*)/;

module.exports = function (gulp, $) {

    gulp.task('proxy', function () {

        var proxyServer = http.createServer(function (req, res) {

            var _url = url.parse(req.url);
            var match = _url.pathname.match(CODE_MACHINE_REGEXP);

            if (match) {
                // rewrite url, removint hte iniital '/mc/cm/:projectId'
                _url.pathname = match[1];
                req.url = url.format(_url)

                codeMachineProxy.web(req, res);
            } else {
                console.log('did not match anything ' + req.url);
                console.log(_url.pathname);
                console.log(_url);
            }
        });

        proxyServer.on('upgrade', function (req, socket, head) {

            var _url = url.parse(req.url);
            var match = _url.pathname.match(CODE_MACHINE_REGEXP);

            if (match) {
                // rewrite url, removint hte iniital '/mc/cm/:projectId'
                _url.pathname = match[1];
                req.url = url.format(_url)
                
                codeMachineProxy.ws(req, socket, head);
            } else {
                console.log('did not match anything ' + req.url);
                console.log(_url.pathname);
                console.log(_url);
            }
        });

        proxyServer.listen(5000, function () {
            console.log('proxy server listening at port 5000');
        });
    });
};
