requirejs.config({

    baseUrl: 'static',

    paths: {
        jquery: 'node_modules/jquery/dist/jquery',
        ol: 'node_modules/ol/ol',
        map: 'js/map',
        json: 'node_modules/json2/lib/JSON2/static/json2',
        underscore: 'node_modules/underscore/underscore',
        backbone: 'node_modules/backbone/backbone-min',
        radio: 'node_modules/backbone.radio/build/backbone.radio',
        marionette: 'node_modules/backbone.marionette/lib/backbone.marionette',
        appView: 'appView',
        appModel: 'appModel',
        appCollection: 'appCollection',
    },
    shim: {
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