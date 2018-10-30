define(['map',
        '../node_modules/backbone/backbone',
        '../node_modules/backbone.marionette/lib/backbone.marionette',
        '../../static/node_modules/bootstrap/dist/js/bootstrap',
        ],
        function(map, backbone, marionette, bootstrap) {
    'use strict';

    app.map = new ol.Map({target: 'map'});
    window.map= app.map

    var Question = Backbone.Model.extend();

    var QuestionList = Backbone.Collection.extend({
        model: Question,
        url: '/polls/geopoint/',
    });
//================================================= Вывод на карту===================================================

    var question_list = new QuestionList();
    question_list.fetch();
    question_list.on('sync', function(response){

		var geojsonObject = response.models[0].attributes

        var format = new ol.format.GeoJSON({
			featureProjection:"EPSG:3857",
		});

		var source = new ol.source.Vector({
            features: format.readFeatures(geojsonObject),
            format: new ol.format.GeoJSON()
		});

		var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                stroke: new ol.style.Stroke({
                    color: [10, 33, 203],
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: [74, 94, 252],
                })
            })
        });

		var element = document.getElementById('popup');

		var popup = new ol.Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false
		});
		window.map.addOverlay(popup);

//======================================================popup при клике

		window.map.on('click', function(evt) {
			var feature = window.map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            });
            var element = popup.getElement();

//==================================================== кнопка закрыть
			var closer = document.getElementById('popup-closer');
            $(element).popover('destroy');

			if (feature) {
				var coordinate = feature.getGeometry().flatCoordinates;
                var hdms = ol.coordinate.toStringXY(ol.proj.transform(
                    coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
                popup.setPosition(coordinate);
				closer.onclick = function() {
                    popup.setPosition(undefined);
                    closer.blur();
                    return false;
                };
                $(element).popover({
                    'placement': 'top',
                    'animation': false,
                    'html': true,
					'content':  feature.getProperties().question_text + '<hr> Координаты: ' + hdms
                });
	            $(element).popover('show');
	        }else {
                $(element).popover('destroy');
                popup.setPosition(undefined);
            }
		});

//=======================================================курсор pointer

		var cursorHoverStyle = "pointer";
		var target = window.map.getTarget();
		var jTarget = typeof target === "string" ? window.$("#"+target) : window.$(target);
		window.map.on("pointermove", function (event) {
            var mouseCoordInMapPixels = [event.originalEvent.offsetX, event.originalEvent.offsetY];
            var hit = window.map.forEachFeatureAtPixel(mouseCoordInMapPixels, function (feature, layer) {
                return true;
            });

            if (hit) {
                jTarget.css("cursor", cursorHoverStyle);
            } else {
                jTarget.css("cursor", "");
            }
		});

		var layer = new ol.layer.Vector({
            source: source,
            style: style,
            format: new ol.format.GeoJSON()
		});
		window.map.addLayer(layer);
	});

//==========================================слои и элементы правления==============================================


    var osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    app.map.addLayer(osmLayer);

    var view = new ol.View({
        center: ol.proj.fromLonLat([39.718705, 47.222531]),
        zoom: 13,
    });
    app.map.setView(view);

    var zoomToExtentControl = new ol.control.ZoomToExtent({
		extent: [4411466.02, 5968472.74, 4431466.02, 5988472.74,],
		tipLabel: 'Начальный экстент',
		label: '',
    });
	app.map.addControl(zoomToExtentControl);

    var zoom = new ol.control.Zoom({
        zoomInTipLabel : 'Приблизить',
        zoomOutTipLabel : 'Отдалить',
    })
    app.map.addControl(zoom);

    var osm_default = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var mousePosition = new ol.control.MousePosition({
        className: 'mouse-position',
        target: 'map',
		projection: 'EPSG:4326',
		coordinateFormat: ol.coordinate.createStringXY(4),
		undefinedHTML: 'Пока не доступно',
    });
    app.map.addControl(mousePosition);

});