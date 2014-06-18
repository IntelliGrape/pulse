/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

pulse.RendererInterface = function () {

  var _this = this;

  var renderer,
    _layers = {
      active: {},
      all: {}
    };

  /**
   * Implements a Renderer
   * */
  this.implement = function (impl) {
    renderer = impl;
    return _this;
  };

  this.clearLayer = function (name) {
    return renderer.clearLayer(_layers.all[name].pulseLayerObj);
  };

  this.getLiveLayerByName = function (name) {
    return _layers.active[name] || null;
  };

  this.addLayer = function (pulseLayerObj, container, isActive) {
    _layers.all[pulseLayerObj.name] = {
      pulseLayerObj: pulseLayerObj,
      rendererLayerObj: _generateRendererLayerFromPulseLayer(pulseLayerObj, container, isActive)
    };

    if (isActive) _layers.active[pulseLayerObj.name] = _layers.all[pulseLayerObj.name];

  };

  this.removeLayer = function (layerName) {
    renderer.removeLayer(_layers.all[layerName].pulseLayerObj);
    delete _layers.all[layerName];
    delete _layers.active[layerName];
  };

  this.prepareLayers = function (defaultWidth, defaultHeight) {
    _layers.active = {};
    var layersToBeUpdated = [];
    for (var name in _layers.all) {
      if (_layers.all.hasOwnProperty(name)) {
        //Check the layer size, setting it if necessary
        if (_layers.all[name].pulseLayerObj.size.width < 1) {
          _layers.all[name].pulseLayerObj.size.width = defaultWidth;
          _layers.all[name].rendererLayerObj.layerWidth = defaultWidth;
        }
        if (_layers.all[name].pulseLayerObj.size.height < 1) {
          _layers.all[name].pulseLayerObj.size.height = defaultHeight;
          _layers.all[name].rendererLayerObj.layerHeight = defaultHeight;
        }
        if (_layers.all[name].rendererLayerObj.isActive) _layers.active[name] = _layers.all[name];
        layersToBeUpdated.push(_layers.all[name].rendererLayerObj);
      }
    }
    //Ask renderer to update layers
    renderer.updateMultipleLayers(layersToBeUpdated);
  };

  //private
  function _generateRendererLayerFromPulseLayer(pulseLayerObj, container, isActive) {
    return renderer.addLayer({
      isActive: isActive,
      containerElement: container,
      layerHeight: pulseLayerObj.size.height,
      layerWidth: pulseLayerObj.size.width,
      layerX: pulseLayerObj.position.x,
      layerY: pulseLayerObj.position.y,
      name: pulseLayerObj.name,
      zIndex: pulseLayerObj.zindex
    });
  }
};