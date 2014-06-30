/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

pulse.RendererInterface = function () {
//todo activate layer and deactivate layer.
  var _this = this;

  var renderer,
    _layers = {
      //Defines how scene layers will be saved
      sceneId: {
        active: {},
        all: {}
      }
    };

  /**
   * Implements a Renderer
   * */
  this.implement = function (impl) {
    renderer = impl;
    return _this;
  };

  this.clearLayer = function (name, sceneId) {
    buildSceneLayerHolderIfNotDefined(sceneId);
    return renderer.clearLayer(_layers[sceneId].all[name].pulseLayerObj);
  };

  /**
   * Clears the section in the layer.
   * @param {Number} x x bound of box top left corner.
   * @param {Number} y y bound of box top right corner
   * @param {Number} width width of box
   * @param {Number} height height of box
   * @param {String} layerName name od the layer to be acted upon
   * @param {Number} sceneId ID of the scene layer belongs to.
   * */
  this.clearLayerSection = function (x, y, width, height, layerName, sceneId) {
    return renderer.clearLayerSection(
      x, y,
      width, height,
      _layers[sceneId].active[layerName] && _layers[sceneId].active[layerName].rendererLayerObj
    )
  };

  this.getLiveLayerByName = function (name, sceneId) {
    buildSceneLayerHolderIfNotDefined(sceneId);
    return _layers[sceneId].active[name] && _layers[sceneId].active[name].pulseLayerObj || null;
  };

  this.addLayer = function (pulseLayerObj, container, isActive, sceneId) {
    buildSceneLayerHolderIfNotDefined(sceneId);
    _layers[sceneId].all[pulseLayerObj.name] = {
      pulseLayerObj: pulseLayerObj,
      rendererLayerObj: _generateRendererLayerFromPulseLayer(pulseLayerObj, container, isActive)
    };
    if (isActive) _layers[sceneId].active[pulseLayerObj.name] = _layers[sceneId].all[pulseLayerObj.name];
  };

  this.removeLayer = function (layerName, sceneId) {
    buildSceneLayerHolderIfNotDefined(sceneId);
    renderer.removeLayer(_layers[sceneId].all[layerName].rendererLayerObj);
    delete _layers[sceneId].all[layerName];
    delete _layers[sceneId].active[layerName];
  };

  this.prepareLayers = function (defaultWidth, defaultHeight, sceneId) {
    buildSceneLayerHolderIfNotDefined(sceneId);
    _layers[sceneId].active = {};
    var layersToBeUpdated = [];
    for (var name in _layers[sceneId].all) {
      if (_layers[sceneId].all.hasOwnProperty(name)) {
        //Check the layer size, setting it if necessary
        if (_layers[sceneId].all[name].pulseLayerObj.size.width < 1) {
          _layers[sceneId].all[name].pulseLayerObj.size.width = defaultWidth;
          _layers[sceneId].all[name].rendererLayerObj.layerWidth = defaultWidth;
        }
        if (_layers[sceneId].all[name].pulseLayerObj.size.height < 1) {
          _layers[sceneId].all[name].pulseLayerObj.size.height = defaultHeight;
          _layers[sceneId].all[name].rendererLayerObj.layerHeight = defaultHeight;
        }
        if (_layers[sceneId].all[name].rendererLayerObj.isActive) _layers[sceneId].active[name] = _layers[sceneId].all[name];
        layersToBeUpdated.push(_layers[sceneId].all[name].rendererLayerObj);
      }
    }
    //Ask renderer to update layers
    renderer.updateMultipleLayers(layersToBeUpdated);
  };

  this.addVisualToLayer = function (pulseVisualObj, layerName, sceneId) {
    var layerRef = _layers[sceneId].all[layerName];
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name] = {
      pulseVisualObj: pulseVisualObj,
      rendererVisualObj: renderer.addVisualToLayer(pulseVisualObj, layerRef.rendererLayerObj)
    };
    if (_layers[sceneId].active[layerName]) _layers[sceneId].active[layerName] = _layers[sceneId].all[layerName];
  };

  this.removeVisualFromLayer = function(pulseVisualObj, layerName, sceneId){
    var layerRef = _layers[sceneId].all[layerName];
    renderer.removeVisualFromLayer(
      layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj,
      layerRef.rendererLayerObj
    );
    delete layerRef.rendererLayerObj.visuals[pulseVisualObj.name];
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
      zIndex: pulseLayerObj.zindex,
      visuals: {}
    });
  }

  function buildSceneLayerHolderIfNotDefined(sceneId) {
    if (!_layers.hasOwnProperty(sceneId)) {
      _layers[sceneId] = {
        active: {},
        all: {}
      };
    }
  }

};