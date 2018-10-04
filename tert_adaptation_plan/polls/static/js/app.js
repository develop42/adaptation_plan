requirejs(['../node_modules/jquery/dist/jquery',
            '../ol/ol',
            'map',
            '../node_modules/json2/lib/JSON2/static/json2',
            '../node_modules/underscore/underscore',
            '../node_modules/backbone/backbone-min',
            '../node_modules/backbone.radio/build/backbone.radio',
            '../node_modules/backbone.marionette/lib/backbone.marionette',
            'appView',
            'application',
//            'appModel',
//            'appCollection',
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
         Application,
//         appModel,
//         appCollection,
         ){
			window.$(document).ready(function() {

				var myApplication = new Application();
				myApplication.init();
			});

		  }
);