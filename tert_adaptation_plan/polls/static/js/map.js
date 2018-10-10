define(['map'], function(map) {
   'use strict';

    var map = new ol.Map({target: 'map'});
    var osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    map.addLayer(osmLayer);

    var view = new ol.View({
        center: ol.proj.fromLonLat([39.718705, 47.222531]),
        zoom: 13,
    });
    map.setView(view);

    var zoomToExtentControl = new ol.control.ZoomToExtent({
		extent: [4411466.02, 5968472.74, 4431466.02, 5988472.74,],
		tipLabel: 'Начальный экстент',
		label: '',
    });

    var zoom = new ol.control.Zoom({
        zoomInTipLabel : 'Приблизить',
        zoomOutTipLabel : 'Отдалить',
    })
    map.addControl(zoom);

    var osm_default = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    map.addControl(zoomToExtentControl);
    var controls = map.getControls();
    var attributionControl;
    controls.forEach(function (el) {
        if (el instanceof ol.control.Attribution) {
          attributionControl = el;
        }
    });
    map.removeControl(attributionControl);

    var mousePosition = new ol.control.MousePosition({
        className: 'mouse-position',
        target: 'map',
		projection: 'EPSG:4326',
		coordinateFormat: ol.coordinate.createStringXY(4),
		undefinedHTML: 'Пока не доступно',
    });
    map.addControl(mousePosition);


	var link = document.querySelector('link[rel="import"]');
    var content = link.import;
    var el = content.querySelector('#list');
    document.querySelector('#form').appendChild(el);


});