define(['appView'], function(appView) {

    const Root = Marionette.ItemView.extend({

        tagName: 'h1',
        className: 'h3',
        template: _.template('Hello World'),

    });

    const root = new Root();
    root.render();
    $('#app').html(root.$el);

})









// var Mn = require ( ['backbone.marionette'], );
//SearchView = Backbone.View.extend({
//    initialize: function() {
//        alert('Initialized!');
//    },
//    events: {
//        'click input[type=button]': 'doSearch'
//    },
//    render: function() {
//        var template = _.template($('#search_template').html(), {});
//        this.$el.html(template);
//        return this;
//    }
//});
//var searchView = new SearchView({ el: $('#search_container') });