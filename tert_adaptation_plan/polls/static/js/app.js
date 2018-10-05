requirejs(['../node_modules/jquery/dist/jquery',
            '../ol/ol',
            'map',
            '../node_modules/json2/lib/JSON2/static/json2',
            '../node_modules/underscore/underscore',
            '../node_modules/backbone/backbone',
            '../node_modules/backbone.radio/build/backbone.radio',
            '../node_modules/backbone.marionette/lib/backbone.marionette',
            'appView',
            ],

function($,
		 ol,
		 map,
         json,
         underscore,
         backbone,
         radio,
         marionette,
         appView,){

			window.$(document).ready(function() {
				var Application = Marionette.Application.extend({
					initialize: function(){}
				});

				var myApplication = new Application();
                myApplication.on('start', function() {
                    Backbone.history.start();
                });

				myApplication.start();
			});
		 }
);
