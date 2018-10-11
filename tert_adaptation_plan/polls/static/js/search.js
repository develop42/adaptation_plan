define(['search',
		'../node_modules/backbone/backbone',
		'../node_modules/backbone.marionette/lib/backbone.marionette',
		'map',
		],
	function(search, backbone, marionette, map,
	){
		'use strict';

		var Question = Backbone.Model.extend({
            url: '/polls/geopoint/',
        });
        ol

        var QuestionList = Backbone.Collection.extend({
            model: Question,
            url: '/polls/geopoint/',
        });


        var question_list = new QuestionList();
        question_list.fetch();
        question_list.on('sync', function(response){


			var geojsonObject = response.models[0].attributes


			var source = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
			});

			
            var styleFunction = new ol.style.Style({
                image : new ol.style.Icon(({
                anchor : [ 0.5, 1 ],
                src : '../img/logo.bmp'
                }))
            });

			var layer = new ol.layer.Vector({
                source: source,
                style: styleFunction
			});
//			app.map. = new ol.Map({layers: [layer]});
			app.map.addLayer(layer);


        });




        var ListQuestion = Marionette.ItemView.extend({
            tagName: 'div',
            className: '.list',
            template: _.template($('#script_list').html()),
            initialize: function(){
                this.render();
            },
            onRender: function(){
            debugger;
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

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