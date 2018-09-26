define(['map'], function(map) {
   'use strict;'

    var map = new ol.Map({target: 'map'});

    var osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    map.addLayer(osmLayer);

    var view = new ol.View({
        center: [ 4188426.7147939987, 7508764.236877314 ],
        zoom: 12,
    });
    map.setView(view);

    var zoomToExtentControl = new ol.control.ZoomToExtent({
		extent: [4178426.79147939987, 7498764.237877314, 4198426.7147939987, 7518764.236877314 ],
    });

    var osm_default = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    map.addControl(zoomToExtentControl);
    var controls = map.getControls();
    var attributionControl;
    controls.forEach(function (el) {
        console.log(el instanceof ol.control.Attribution);
        if (el instanceof ol.control.Attribution) {
          attributionControl = el;
        }
    });
    map.removeControl(attributionControl);
})
