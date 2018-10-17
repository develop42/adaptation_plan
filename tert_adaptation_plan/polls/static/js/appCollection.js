define(['appCollection', 'backbone', 'marionette'],
function(appCollection, backbone, marionette) {
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


    var ClickView = Backbone.View.extend({
        events:{
            "click .submit": "submit",
        },
		submit: function(event){
			event.preventDefault();
		}
    });
    debugger

//    var clickView = new ClickView();

});