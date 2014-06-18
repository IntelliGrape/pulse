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
    _this = this,
    /**
     * HTML element container for this scene, will hold the canvas element.
     * @type {HTMLElement}
     */
      _container = null;

  this.getLayerContextByName = function (name) {
    return _layers[name].context;
  };

  this.clearLayer = function (name) {
    var canvas = _layers[name].canvas;
    this.getLayerContextByName(name).clearRect(0, 0, canvas.width, canvas.height);
  };

  this.addLayer = function (name) {
    //Added the the layer to the _container
    _container.appendChild(this.getLiveCanvas(_layers[name]));
  };

  this.removeLayer = function (name){
    delete _layers[name];
    
  };


};