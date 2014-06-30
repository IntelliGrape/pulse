/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

pulse.RendererInterface = function () {
  //todo activate layer and deactivate layer. Layer update methods
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

    var visualObj = {
      positionPrevious: pulseVisualObj.positionPrevious,
      size: pulseVisualObj.size,
      sizePrevious: pulseVisualObj.sizePrevious,
      bounds: pulseVisualObj.bounds,
      boundsPrevious: pulseVisualObj.boundsPrevious,
      anchor: pulseVisualObj.anchor,
      anchorPrevious: pulseVisualObj.anchorPrevious,
      anchorRadius: pulseVisualObj.anchorRadius,
      anchorAngle: pulseVisualObj.anchorAngle,
      scale: pulseVisualObj.scale,
      scalePrevious: pulseVisualObj.scalePrevious,
      rotation: pulseVisualObj.rotation,
      rotationPrevious: pulseVisualObj.rotationPrevious,
      positionTopLeft: pulseVisualObj.positionTopLeft,
      positionTopLeftPrevious: pulseVisualObj.positionTopLeftPrevious,
      invalidProperties: pulseVisualObj.invalidProperties,
      zindex: pulseVisualObj.zindex,
      zindexPrevious: pulseVisualObj.zindexPrevious,
      shuffled: pulseVisualObj.shuffled,
      alpha: pulseVisualObj.alpha,
      alphaPrevious: pulseVisualObj.alphaPrevious,
      shadow: {
        shadowEnabled: pulseVisualObj.shadowEnabled,
        shadowEnabledPrevious: pulseVisualObj.shadowEnabledPrevious,
        shadowOffsetX: pulseVisualObj.shadowOffsetX,
        shadowOffsetY: pulseVisualObj.shadowOffsetY,
        shadowBlur: pulseVisualObj.shadowBlur,
        shadowColor: pulseVisualObj.shadowColor
      },
      visible: pulseVisualObj.visible,
      visiblePrevious: pulseVisualObj.visiblePrevious,
      updated: pulseVisualObj.updated,
      type: pulseVisualObj.visualType || pulse.enum.VisualObjectType.VISUAL
    };

    layerRef.rendererLayerObj.visuals[pulseVisualObj.name] = {
      pulseVisualObj: pulseVisualObj,
      rendererVisualObj: renderer.addVisualToLayer(visualObj, layerRef.rendererLayerObj)
    };
    if (_layers[sceneId].active[layerName]) _layers[sceneId].active[layerName] = _layers[sceneId].all[layerName];
  };

  this.removeVisualFromLayer = function (pulseVisualObj, layerName, sceneId) {
    var layerRef = _layers[sceneId].all[layerName];
    renderer.removeVisualFromLayer(
      layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj,
      layerRef.rendererLayerObj
    );
    delete layerRef.rendererLayerObj.visuals[pulseVisualObj.name];
  };

  this.updateVisualInLayer = function (pulseVisualObj, layerName, sceneId) {
    var layerRef = _layers[sceneId].all[layerName];
    //Update original object
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].pulseVisualObj = pulseVisualObj;

    //Update renderer object
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.positionPrevious = pulseVisualObj.positionPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.size = pulseVisualObj.size;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.sizePrevious = pulseVisualObj.sizePrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.bounds = pulseVisualObj.bounds;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.boundsPrevious = pulseVisualObj.boundsPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.anchor = pulseVisualObj.anchor;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.anchorPrevious = pulseVisualObj.anchorPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.anchorRadius = pulseVisualObj.anchorRadius;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.anchorAngle = pulseVisualObj.anchorAngle;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.scale = pulseVisualObj.scale;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.scalePrevious = pulseVisualObj.scalePrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.rotation = pulseVisualObj.rotation;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.rotationPrevious = pulseVisualObj.rotationPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.positionTopLeft = pulseVisualObj.positionTopLeft;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.positionTopLeftPrevious = pulseVisualObj.positionTopLeftPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.invalidProperties = pulseVisualObj.invalidProperties;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.zindex = pulseVisualObj.zindex;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.zindexPrevious = pulseVisualObj.zindexPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shuffled = pulseVisualObj.shuffled;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.alpha = pulseVisualObj.alpha;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.alphaPrevious = pulseVisualObj.alphaPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shadow.shadowEnabled = pulseVisualObj.shadowEnabled;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shadow.shadowEnabledPrevious = pulseVisualObj.shadowEnabledPrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shadow.shadowOffsetX = pulseVisualObj.shadowOffsetX;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shadow.shadowOffsetY = pulseVisualObj.shadowOffsetY;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shadow.shadowBlur = pulseVisualObj.shadowBlur;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.shadow.shadowColor = pulseVisualObj.shadowColor;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.visible = pulseVisualObj.visible;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.visiblePrevious = pulseVisualObj.visiblePrevious;
    layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj.updated = pulseVisualObj.updated;

    return renderer.updateVisual(layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj, layerRef.rendererLayerObj);
  };

  this.drawVisualObject = function (pulseVisualObj, layerName, sceneId) {
    var layerRef = _layers[sceneId].all[layerName];
    switch (pulseVisualObj.visualType) {
      case pulse.enum.VisualObjectType.VISUAL:
        renderer.drawPlainVisualObject(layerRef.rendererLayerObj.visuals[pulseVisualObj.name].rendererVisualObj, layerRef.rendererLayerObj);
        break;
      case pulse.enum.VisualObjectType.SPRITE:
        break;
      case pulse.enum.VisualObjectType.BITMAP_LABEL:
        break;
      case pulse.enum.VisualObjectType.CANVAS_LABEL:
        break;
    }
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