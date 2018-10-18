define(['appView',
//		'../node_modules/jquery/dist/jquery.min',
//		'../node_modules/json2/lib/JSON2/static/json2',
//		'../node_modules/underscore/underscore',
		'backbone',
        '../node_modules/backbone.marionette/lib/backbone.marionette',
        ],
function(appView,
//		$,
		json2,
		underscore,
		backbone,
		marionette, ) {
	'use strict';


    var Head = Marionette.ItemView.extend({
        template: _.template($('#app').html()),
    });
    var head = new Head();
    head.render();
    $('#app').html(head.$el);

    var Logo = Marionette.ItemView.extend({
		template: _.template($('#logo').html()),
	});
	var logo = new Logo();
	logo.render();
	$('#logo').html(logo.$el);



});

