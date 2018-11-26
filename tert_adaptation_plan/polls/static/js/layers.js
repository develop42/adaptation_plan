(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../libs/ol/ol-debug"], factory);
        debugger
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("ol"));
        debugger
    }else {
        root.layersAdd = factory(root.ol);
        debugger
    }
    /*if (typeof window !== 'undefined' && window.ol) {
        window.ol.layersAdd = factory(ol);
        debugger
    }*/

}(this, function(ol) {
debugger

	ol.control.layersAdd = function(map){
		debugger;
		this.map = map;
//		var _this = this;
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
                params: {'LAYERS': 'osm_auto:all'},
            })
        });
        wmsLayer.name = 'WMS';
        this.map.addLayer(wmsLayer);

        createLayers();
		function switchLayer() {
            var layerName = this.value;
            this.map.getLayers().forEach(function (layer){
                if (layer.name === layerName) {
                    currentLayer.setVisible(false);
                    layer.setVisible(true);
                    currentLayer = layer;
                    return;
                }
            });
        };

        function createLayers() {
        debugger;
            var layerList = document.getElementById('layers');
            this.map.getLayers().forEach(function (layer){
                var layerElement = document.createElement('input');
                layerElement.type = 'radio';
                layerElement.name = 'layers';
                layerElement.value = layer.name;
                layerElement.id = layer.name;
                layerElement.onclick = switchLayer;
                if (layer.getVisible()) { layerElement.checked = true; }
                layerList.appendChild(layerElement);

                var label = document.createElement('label');
                label.htmlFor = layer.name;
                label.innerHTML = layer.name;
                layerList.appendChild(label);

                layerList.appendChild(document.createElement('br'));
            });
            return layerList;
        }

		ol.control.Control.call(this, {
            element: layerList,
        });
	}
	ol.inherits(ol.control.layersAdd, ol.control.Control);
	var layersAdd = ol.control.layersAdd;
        return layersAdd;
}))