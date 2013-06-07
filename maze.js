var map = new ol.Map({
  target: document.getElementById('map'),
  renderer: ol.RendererHint.CANVAS,
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});

var view = map.getView();
var context = map.getRenderer().getCanvas().getContext('2d');
var ferry = document.getElementById('ferry');
var deviceOrientation = new ol.DeviceOrientation();

deviceOrientation.on(['change:beta', 'change:gamma'], function(event) {
  var center = view.getCenter();
  var resolution = view.getResolution();
  var beta = event.target.getBeta() || 0;
  var gamma = event.target.getGamma() || 0;

  center[0] -= resolution * gamma * 25;
  center[1] += resolution * beta * 25;

  view.setCenter(center);

});

view.on('change:center', function(event) {
  var center = map.getPixelFromCoordinate(view.getCenter());
  var pixel = context.getImageData(parseInt(center[0]), parseInt(center[1]), 1, 1).data;
  if (pixel[0] != 181 || pixel[1] != 208 || pixel[2] != 208) {
    ferry.className = 'collide';
  } else {
    ferry.className = '';    
  }
});

deviceOrientation.set('tracking', true);

