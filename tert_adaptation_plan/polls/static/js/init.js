(function() {
    'use strict';

    requirejs.config({
        /*config: {
            text: {
                useXhr: function (url) {
                    url: 'node_modules/text/text'
                },
                text: 'node_modules/text/text'
            }
        },*/
        baseUrl: 'static',
        paths: {
            jquery: 'node_modules/jquery/dist/jquery.min',
            ol: 'libs/ol/ol-debug',
            map: 'js/map',
            json: 'node_modules/json2/lib/JSON2/static/json2',
            underscore: 'node_modules/underscore/underscore',
            backbone: 'node_modules/backbone/backbone',
            radio: 'node_modules/backbone.radio/build/backbone.radio',
            marionette: 'node_modules/backbone.marionette/lib/backbone.marionette',
            search: 'search',
            app: 'app',
            bootstrap: 'node_modules/bootstrap/dist/js/bootstrap',
            text: '/polls/static/node_modules/text/text',
            layers: 'layers'
        },

        shim: {
            'jquery': {
                exports: '$'
            },
            'underscore': {
                deps: ["jquery"],
                exports: '_'
            },
            'json': {
                deps: ["jquery"],
                exports: 'JSON'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

        }

    });

})()