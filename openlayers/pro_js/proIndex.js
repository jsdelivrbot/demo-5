/**
 * Created by EKuter-amu on 2017/7/10.
 */


var map = new ol.Map({
	logo:false,
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({

            	params:{
            		'LAYERS':'topp:states',
                    'VERSION':'1.1.0',
                    'BBOX':[-124.73142200000001,24.955967,-66.969849,49.371735],
                    'CRS':'EPSG:4326',
                    'WIDTH':768,
                    'HEIGHT':330
            	},
            	projection:"EPSG:4326",
                url:'http://http://192.168.1.253:8080/geoserver/topp/wms'
            })
        })
    ],
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }),
    view: new ol.View({
        center: [0, 0],
        zoom: 2
    })
});

document.getElementById('zoom-out').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
};
