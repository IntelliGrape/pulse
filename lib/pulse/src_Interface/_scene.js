var pulse = pulse || {};
pulse.Scene = pulse.Node.extend({init: function (params) {
  this._super(params);
},
  setDefaultSize: function (width, height) {},
  addLayer: function (layer, zindex) {},
  removeLayer: function (name) {},
  getLayer: function (name) {},
  getLiveLayer: function (name) {},
  getLiveCanvas: function (layer) {},
  updateLiveLayers: function () {},
  getSceneContainer: function () {},
  update: function (elapsed) {},
  draw: function () {},
  on: function (type, callback) {},
  eventsCallback: function (type, evt) {}
});
