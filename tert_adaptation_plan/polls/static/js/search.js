define(['../node_modules/backbone/backbone',
        '../node_modules/backbone.marionette/lib/backbone.marionette',
        'map',
//        'text!../../templates/polls/search.html',
        'text!search.html',
        '../libs/ol/ol-debug',
    ],
    function(backbone, marionette, map, html, ol) {
        'use strict';

        var Question = Backbone.Model.extend();

        var QuestionList = Backbone.Collection.extend({
            model: Question,
        });

        var question_list = new QuestionList();

        var ResultView = Marionette.LayoutView.extend({
            el: '#list',
            template: $(html).filter('#search_result')[0].outerHTML,
            regions: {
                list: '#list',
            },
            templateHelpers: function() {
                return {
                    objects_geo: this.options.objects_geo,
                }
            },
            ui: {
                coord: '#coord'
            },
            events: {
                "click a": "close",
                "click #li": "show_block"
            },
            close: function(e) {
                $("#list").hide();
            },
            show_block: function(e) {
                var elem = this.ui.coord;
                if (elem[0].style.display == "block") {
                    elem.hide();
                } else {
                    elem.show();
                }
                for (var obj = 0; obj < this.options.objects_geo.length; obj++) {
                    //				for (var obj in this.options.objects_geo){
                    var view = new ol.View({
                        center: ol.proj.fromLonLat(
                            this.options.objects_geo[obj].geoQuest.coordinates
                        ),
                        zoom: 13,
                    });
                    window.map.setView(view);
                }
            },
            onRender: function() {
                this.showChildView('list', formView);
            },
        });

        var FormView = Marionette.LayoutView.extend({
            template: _.template($('#form').html()),
            regions: {
                form: '#search_form',
            },
            events: {
                "submit": "submit",
            },
            submit: function(event) {
                event.preventDefault();
                var _data = $("input[name='input']").val();
                question_list.fetch({
                    url: '/polls/map/search/?value=' + _data
                });
                var _this = this;
                question_list.on('sync', function(response) {
                    var geojsonObjects = response.models[0].attributes.results;
                    _this.getRegion('form').show(new ResultView({
                        objects_geo: geojsonObjects
                    }));
                });
                $('#list').show();
            },
        });
        var formView = new FormView();
        formView.render();
        $('#form').html(formView.$el);
    });