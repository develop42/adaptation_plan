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

//    var ListQuestion = Marionette.ItemView.extend({
//        tagName: 'div',
//        className: 'list',
//        template: _.template($('script_list').html()),
//        render: function(){
//            this.$el.html(this.template(this.model.toJSON()));
//            return this;
//        }
//    });

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