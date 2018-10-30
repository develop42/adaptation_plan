define(['search',
		'../node_modules/backbone/backbone',
		'../node_modules/backbone.marionette/lib/backbone.marionette',
		'map',
        'text!templates/polls/search.html',
		],
	function(search, backbone, marionette, map, html,
	){
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
			templateHelpers: function(){
				return {
					objects_geo: this.options.objects_geo,
				}
			},
			events:{
				"click a": "close"
			},
			close: function(e){
				document.getElementById('list').style.display = "none"
			},
			onRender: function(){
				this.showChildView('list', formView);
			},
        });

		var FormView = Marionette.LayoutView.extend({
			template: _.template($('#form').html()),
			regions: {
				form: '#search_form',
			},
			events:{
                "submit": "submit",
            },
            submit: function(event){
                event.preventDefault();
                var _data = $("input[name='input']").val();
				question_list.fetch({
					url: '/polls/map/search/?value=' + _data
				});
				var _this = this;
				question_list.on('sync', function(response){
					var geojsonObjects = response.models[0].attributes.results;
                    _this.getRegion('form').show(new ResultView({objects_geo: geojsonObjects}));

                });
				document.getElementById('list').style.display = "block";
			},
		});
		var formView = new FormView();
		formView.render();
		$('#form').html(formView.$el);

	}
);