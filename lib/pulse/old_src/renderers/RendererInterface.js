/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

pulse.RendererInterface = function () {

  var _this = this;

  var renderer;

  /**
   * Implements a Renderer
   * */
  this.implement = function (impl) {
    renderer = impl;
    return _this;
  };

  //Get layer by name
  this.getLayerContextByName = function (layerName) {
     return renderer.getLayerContextByName(layerName);
  };

  this.clearLayer = function (name) {
    return renderer.clearLayer(name);
  }
};