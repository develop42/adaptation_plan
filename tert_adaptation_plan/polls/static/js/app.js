requirejs(['../node_modules/jquery/dist/jquery.min',
            '../ol/ol-debug',
            'map',
            '../node_modules/json2/lib/JSON2/static/json2',
            '../node_modules/underscore/underscore',
            '../node_modules/backbone/backbone',
            '../node_modules/backbone.radio/build/backbone.radio',
            '../node_modules/backbone.marionette/lib/backbone.marionette',
            'appView',
            'search',
            'init'
            ],

function($,
		 ol,
		 map,
         json,
         underscore,
         backbone,
         radio,
         marionette,
         appView,
         search,
         init,
         ){
requirejs(['jquery'], function($) {
debugger
			window.$(document).ready(function() {
				var Application = Marionette.Application.extend({

				});

				var myApplication = new Application();

                myApplication.on('start', function() {
                    Backbone.history.start();

                });

				myApplication.start();
				window.app = myApplication
			});
			});

		 }
);
