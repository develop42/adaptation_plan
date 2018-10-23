(function() {
    'use strict';

requirejs.config({
    baseUrl: 'static',
    paths: {
        jquery: 'node_modules/jquery/dist/jquery.min',
        ol: 'ol/ol-debug',
        map: 'js/map',
        json: 'node_modules/json2/lib/JSON2/static/json2',
        underscore: 'node_modules/underscore/underscore',
        backbone: 'node_modules/backbone/backbone',
        radio: 'node_modules/backbone.radio/build/backbone.radio',
        marionette: 'node_modules/backbone.marionette/lib/backbone.marionette',
        appView: 'appView',
		search: 'search',
		app: 'app',
		bootstrap: 'node_modules/bootstrap/dist/js/bootstrap',
		text: 'node_modules/text/text',
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            deps:["jquery"],
            exports: '_'
        },
        'json': {
            deps:["jquery"],
            exports: 'JSON'
        },
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

	}



});
define('jquery', [], function() {
    return jQuery;
});
/*requirejs(['../../static/node_modules/jquery/dist/jquery', '../../static/js/app',], function($, app) {
        window.$(document).ready(function() {
            window.app.start();
        });
    })*/

})()


