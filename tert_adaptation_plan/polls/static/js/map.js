define(['map',
        '../node_modules/backbone/backbone',
        '../node_modules/backbone.marionette/lib/backbone.marionette',
        'layers',
        'screen_map'
    ],
    function(map, backbone, marionette) {
        'use strict';

        map = new ol.Map({
            target: 'map'
        });
        window.map = map

        var Question = Backbone.Model.extend();

        var QuestionList = Backbone.Collection.extend({
            model: Question,
            url: '/geopoint/',
        });
        //========================================== Вывод точек на карту===========================================

        var question_list = new QuestionList();
        question_list.fetch();
        question_list.on('sync', function(response) {

            var geojsonObject = response.models[0].attributes

            var format = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
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

            //======================================== popup при клике

            map.on('click', function(evt) {
                var feature = window.map.forEachFeatureAtPixel(evt.pixel,
                    function(feature, layer) {
                        return feature;
                    });
                var element = popup.getElement();

                //==================================== кнопка закрыть
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
                        'content': feature.getProperties().question_text + '<hr> Координаты: ' + hdms
                    });
                    $(element).popover('show');
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }
            });

            //=======================================курсор pointer

            var cursorHoverStyle = 'pointer';
            var target = window.map.getTarget();
            window.map.on('pointermove', function(event) {
                var hit = window.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
                    return true;
                });
                if (hit) {
                    this.getTargetElement().style.cursor = hit ? 'pointer' : '';
                } else {
                    this.getTargetElement().style.cursor = '';
                }
            });
            var layer = new ol.layer.Vector({
                source: source,
                style: style,
                format: new ol.format.GeoJSON()
            });
            window.map.addLayer(layer);
        });

        //====================================слои и элементы управления=======================================

        var view = new ol.View({
            center: ol.proj.fromLonLat([39.718705, 47.222531]),
            zoom: 13,
        });
        map.setView(view);

        var zoomToExtentControl = new ol.control.ZoomToExtent({
            extent: [4411466.02, 5968472.74, 4431466.02, 5988472.74, ],
            tipLabel: 'Начальный экстент',
            label: '',
        });
        map.addControl(zoomToExtentControl);

        var zoom = new ol.control.Zoom({
            zoomInTipLabel: 'Приблизить',
            zoomOutTipLabel: 'Отдалить',
        })
        map.addControl(zoom);

        var osm_default = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        var layerSwitcher = new ol.control.layersAdd(map);
        map.addControl(layerSwitcher);

        var screenMap = new ol.control.screenMap(map);
        map.addControl(screenMap);

        var mousePosition = new ol.control.MousePosition({
            className: 'mouse-position',
            target: 'map',
            projection: 'EPSG:4326',
            coordinateFormat: ol.coordinate.createStringXY(4),
            undefinedHTML: 'Пока не доступно',
        });
        map.addControl(mousePosition);

        return map;
    });