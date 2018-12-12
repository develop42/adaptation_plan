(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../libs/ol/ol-debug"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("../libs/ol/ol-debug"));
    } else {
        root.layersAdd = factory(root.ol);
    }

}(this, function(ol) {
	ol.control.screenMap = function(map) {
		var exportPNGElement = document.createElement('a');
		exportPNGElement.download = 'map.png';
		exportPNGElement.className = 'screen';
		exportPNGElement.title = 'Сохранить Screenshot';
		var map_screen = document.getElementById('map');
		map_screen.insertBefore(exportPNGElement, map_screen.children[1]);
		var img = document.createElement('img');
		img.className = 'screen_ico';
		exportPNGElement.appendChild(img);

	      if ('download' in exportPNGElement) {
	        exportPNGElement.addEventListener('click', function() {
	          map.once('postcompose', function(event) {
	            var canvas = event.context.canvas;
	            exportPNGElement.href = canvas.toDataURL('image/png');
	          });
	          map.renderSync();
	        }, false);
	      } else {
	        var info = document.getElementById('no-download');
	        info.style.display = '';
	      }
	      ol.control.Control.call(this, {
	            element: this.exportPNGElement
	        });
	}
	ol.control.screenMap.prototype.setMap = function(map) {}
	return ol.control.screenMap;
}))
