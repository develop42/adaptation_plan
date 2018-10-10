define(['search',
		'../node_modules/backbone/backbone',
		'../node_modules/backbone.marionette/lib/backbone.marionette',
		'../ol/ol',
		'map',
		],
	function(search, backbone, marionette, ol, map,
	){
		var Question = Backbone.Model.extend({
            url: '/polls/geopoint/',
        });

        var QuestionList = Backbone.Collection.extend({
            model: Question,
            url: '/polls/geopoint/',
        });


        var question_list = new QuestionList();
        question_list.fetch();
        question_list.on('sync', function(response){
            debugger
            var dataLayer = new ol.layer.Vector("My GeoJson data from server", {
                projection: new ol.projection("EPSG:4326"),
            });
            var features = getFeatures("/polls/geopoint/");
            dataLayer.addFeatures(features);

			/*var markers = new ol.Layer.Markers("Markers");
            map.addLayer(markers);
            var size = new ol.Size(21,25);
            var offset = new ol.Pixel(-(size.w/2), -size.h);
            var icon = new ol.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);
            markers.addMarker(new ol.Marker(new ol.LonLat(0,0),icon));
            markers.addMarker(new ol.Marker(new ol.LonLat(0,0),icon.clone()));*/

        })

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