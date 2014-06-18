/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

/**
 *
 * */
pulse.PulseDefaultRenderer = function PulseDefaultRenderer() {

  //Make a layers holder
  var _layers = {},
    _this = this;


  this.clearLayer = function (layer) {
    layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
  };

  this.addLayer = function (layer) {
    layer.canvas = getLiveCanvas(layer);
    layer.context = layer.canvas.getContext("2d");
    _updateLiveLayers();
    _layers[layer.name] = layer;
    return layer;
  };

  this.removeLayer = function (layer) {
    layer.containerElement.removeChild(layer.canvas);
    delete _layers[layer.name];
  };

  this.updateMultipleLayers = function (layers) {
    for (var key in layers) {
      if (layers.hasOwnProperty(key)) {
        var layer = layers[key];
        _layers[layer.name].isActive = layer.IsActive;
        _layers[layer.name].layerHeight = layer.layerHeight;
        _layers[layer.name].layerWidth = layer.layerWidth;
        _layers[layer.name].layerX = layer.layerX;
        _layers[layer.name].layerY = layer.layerY;
        _layers[layer.name].zIndex = layer.zIndex;
        _layers[layer.name].canvas.width = layer.layerWidth;
        _layers[layer.name].canvas.height = layer.layerHeight;
      }
    }
    _updateLiveLayers();
  };

//private
  function getLiveCanvas(layer) {
    var liveCanvas = document.createElement('canvas');
    liveCanvas.width = layer.layerWidth;
    liveCanvas.height = layer.layerHeight;
    liveCanvas.style.position = 'absolute';
    liveCanvas.id = 'live:' + layer.name;
    var ctx = liveCanvas.getContext('2d');

    return liveCanvas;
  }

  function _updateLiveLayers() {
    var layers = [];
    //Clear the layers
    for (var layerName in _layers) {
      if (_layers.hasOwnProperty(layerName)) {
        _layers[layerName].containerElement.removeChild(_layers[layerName].canvas);
        layers.push(_layers[layerName]);
      }
    }

    //Sort as per zIndex
    layers = layers.sort(function (a, b) {
      return a.zIndex - b.zIndex;
    });

    for (var key in layers) {
      if (layers.hasOwnProperty(key) && layers[key].isActive) {
        layers[key].containerElement.appendChild(layers[key].canvas);
      }
    }
  }
};