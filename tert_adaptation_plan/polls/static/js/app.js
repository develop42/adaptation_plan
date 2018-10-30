requirejs(['../../static/node_modules/jquery/dist/jquery.min',
            '../ol/ol-debug',
            'map',
            '../node_modules/json2/lib/JSON2/static/json2',
            '../../static/node_modules/underscore/underscore',
            '../node_modules/backbone/backbone',
            '../node_modules/backbone.radio/build/backbone.radio',
            '../node_modules/backbone.marionette/lib/backbone.marionette',
            'search',
            'init',
            '../../static/node_modules/bootstrap/dist/js/bootstrap',
            '../../static/node_modules/text/text',
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
         text,
         ){
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
