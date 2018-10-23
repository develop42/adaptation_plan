define(['search',
		'../node_modules/backbone/backbone',
		'../node_modules/backbone.marionette/lib/backbone.marionette',
		'map',
        'text!templates/polls/search.html',

		],
	function(search, backbone, marionette, map, html,
	){
		'use strict';

		var Question = Backbone.Model.extend({
            url: '/polls/geopoint/',
        });

        var QuestionList = Backbone.Collection.extend({
            model: Question,
            url: '/polls/geopoint/',
        });

        var question_list = new QuestionList();



		var FormView = Marionette.LayoutView.extend({
			template:'#form',
			regions: {
				form: '#f',
			},
			events:{
                "submit": "submit",
            },
            initialize: function(){
            debugger
            },
			submit: function(event){
			debugger
				event.preventDefault();
				question_list.fetch();
                question_list.on('sync', function(response){
					var geojsonObjects = response.models[0].attributes.features[0].properties.question_text;
					document.getElementById("cont").innerHTML = geojsonObjects;
                });
            }
		});
		var formView = new FormView();
		formView.render();


        var ResultView = Marionette.LayoutView.extend({
            el: '#list',
			template: $(html).filter('#search_result')[0].innerHTML,
			regions: {
				list: '#l',
			},
			onShow: function(){
			debugger
//				this.getRegion('list').show(formView);
				this.showChildView('list', formView);
			},
        });
//        formView.form.show(new ResultView());
//        formView.getRegion('form').show(new ResultView());










        /*document.getElementById('btn').onclick = function(){
            document.getElementById('list').style.display = "block";
        }
		document.getElementById('close').onclick = function() {
		    document.getElementById('list').style.display = "none"
        }*/

});