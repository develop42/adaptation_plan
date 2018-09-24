define(['appCollection'], function(appCollection) {

    var Question = Backbone.Model.extend({
        url: '/polls/geopoint/',
    });

    var QuestionList = Marionette.CollectionView.extend({
        model: Question,
    });

    //debugger
    var question_list = new QuestionList();
    question_list.fetch();

})