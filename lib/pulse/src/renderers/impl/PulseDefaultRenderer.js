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

  this.getLayerContextByName = function (name) {
    return _layers[name].context;
  };

  this.clearLayer = function (name) {
    var canvas = _layers[name].canvas;
    this.getLayerContextByName(name).clearRect(0, 0, canvas.width, canvas.height);
  }

};