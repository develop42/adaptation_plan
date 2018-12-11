requirejs(['../../static/node_modules/jquery/dist/jquery.min',
        '../libs/ol/ol-debug',
        'map',
        '../../static/node_modules/json2/lib/JSON2/static/json2',
        '/polls/static/node_modules/underscore/underscore.js',
        '/polls/static/node_modules/backbone/backbone.js',
        '../node_modules/backbone.radio/build/backbone.radio',
        '../node_modules/backbone.marionette/lib/backbone.marionette',
        'search',
        'init',
        '../node_modules/bootstrap/dist/js/bootstrap',
        '../node_modules/text/text',
        'plugins/layers'
    ],

    function($,
        ol,
        map,
        json,
        underscore,
        backbone,
        radio,
        marionette,
        search,
        init,
        bootstrap,
        text
    ) {
        requirejs(['jquery'], function($) {

            window.$(document).ready(function() {
                var Application = Marionette.Application.extend();
                var myApplication = new Application();
                myApplication.on('start', function() {
                    Backbone.history.start();
                });
                myApplication.start();
                window.app = myApplication;
            });
        });

    });