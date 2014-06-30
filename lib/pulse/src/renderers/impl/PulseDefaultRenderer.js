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
  var _this = this;


  this.clearLayer = function (layer) {
    layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
  };

  this.addLayer = function (layer) {
    layer.canvas = getLiveCanvas(layer);
    layer.context = layer.canvas.getContext("2d");
    _updateLiveLayers();
    return layer;
  };

  this.removeLayer = function (layer) {
    layer.containerElement.removeChild(layer.canvas);
  };

  this.updateMultipleLayers = function (layers) {
    _updateLiveLayers(layers);
  };

  this.clearLayerSection = function (x, y, width, height, layerObj) {
    return layerObj.context.clearRect(
      x, y,
      width, height
    );
  };

  this.addVisualToLayer = function (visualObj, layerObj) {
    return visualObj;
  };

  this.removeVisualFromLayer = function (visualObj, layerObj) {
    var clear = visualObj.boundsPrevious;
    return _this.clearLayerSection(
      clear.x, clear.y,
      clear.width, clear.height,
      layerObj
    );
  };

//private
  function getLiveCanvas(layer) {
    var liveCanvas = document.createElement('canvas');
    liveCanvas.width = layer.layerWidth;
    liveCanvas.height = layer.layerHeight;
    liveCanvas.style.position = 'absolute';
    liveCanvas.id = 'live:' + layer.name;
    return liveCanvas;
  }

  function _updateLiveLayers(_layers) {
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