define(['appView',
		'../node_modules/underscore/underscore',
		'backbone',
        '../node_modules/backbone.marionette/lib/backbone.marionette',
        '../node_modules/jquery/dist/jquery'
        ],
function(appView, underscore, backbone, marionette, jquery) {
'use strict';


	var Question = Backbone.Model.extend({
        url: '/polls/geopoint/',
    });

    var QuestionList = Backbone.Collection.extend({
        model: Question,
        url: '/polls/geopoint/',
    });

    var question_list = new QuestionList();
    question_list.fetch();

/*        var ListQuestion = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'list',
        template: _.template($('script_list').html()),
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });*/

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


	var Form = Marionette.ItemView.extend({
		template: _.template($('#form').html()),
		events:{
            "submit": "submit",
        },
		submit: function(event){
			event.preventDefault();
			var text = $(event.currentTarget).find('input[type=text]').val();

		}
	});
	var form = new Form();
	form.render();
	$('#form').html(form.$el);


});

