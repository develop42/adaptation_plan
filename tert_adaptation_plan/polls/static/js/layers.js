(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../libs/ol/ol-debug"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("../libs/ol/ol-debug"));
    } else {
        root.layersAdd = factory(root.ol);
    }

}(this, function(ol) {
    ol.control.layersAdd = function(map) {
        var _this = this;
        this.map = map;
        var osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        osmLayer.name = 'OpenStreetMap';
        this.map.addLayer(osmLayer);

        var currentLayer = osmLayer;

        var bingLabelledAerials = new ol.layer.Tile({
            visible: false,
            source: new ol.source.BingMaps({
                key: 'AkPePzQAUoC7qKlVTNT4nw0Ykq2EJ4nLE9Iq8-7NZY4wI2Owxebqqur_4zMiboZh',
                imagerySet: "AerialWithLabels",
                maxZoom: 19
            })
        });
        bingLabelledAerials.name = 'Bing Космос';
        this.map.addLayer(bingLabelledAerials);

        var wmsLayer = new ol.layer.Tile({
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://129.206.228.72/cached/osm',
                params: {
                    'LAYERS': 'osm_auto:all'
                },
            })
        });
        wmsLayer.name = 'WMS';
        this.map.addLayer(wmsLayer);

        var stamenWatercolor = new ol.layer.Tile({
            visible: false,
            source: new ol.source.Stamen({
                layer: 'watercolor'
            })
        });
        stamenWatercolor.name = 'Stamen Watercolor';
        map.addLayer(stamenWatercolor);

        var stamenToner = new ol.layer.Tile({
            visible: false,
            source: new ol.source.Stamen({
                layer: 'toner'
            })
        });
        stamenToner.name = 'Stamen Toner';
        map.addLayer(stamenToner);

        createLayers();

        function switchLayer() {
            var layerName = this.value;
            _this.map.getLayers().forEach(function(layer) {
                if (layer.name === layerName) {
                    currentLayer.setVisible(false);
                    layer.setVisible(true);
                    currentLayer = layer;
                    return;
                }
            });
        };

        function createLayers() {
            var layerList = document.getElementById('layers');
            var button = document.getElementById('buttonLayers');
            button.title = 'Картографические основы';
            button.onclick = function(e) {
                e = e || window.event;
                e.preventDefault();
                if (layerList.style.display == "none") {
                    $('#layers').show();
                } else {
                    $('#layers').hide()
                }
            }
            _this.map.getLayers().forEach(function(layer) {
                var layerElement = document.createElement('input');
                layerElement.type = 'radio';
                layerElement.name = 'layers';
                layerElement.value = layer.name;
                layerElement.id = layer.name;
                layerElement.onclick = switchLayer;
                if (layer.getVisible()) {
                    layerElement.checked = true;
                }
                layerList.appendChild(layerElement);
                var label = document.createElement('label');
                label.htmlFor = layer.name;
                label.innerHTML = layer.name;
                layerList.appendChild(label);
                layerList.appendChild(document.createElement('br'));
            });
        }
        ol.control.Control.call(this, {
            element: this.layerList
        });
    }
    ol.control.layersAdd.prototype.setMap = function(map) {}
    return ol.control.layersAdd;
}))