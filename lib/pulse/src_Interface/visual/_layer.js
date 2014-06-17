var pulse = pulse || {};
pulse.Layer = pulse.Visual.extend({
  init: function (params) {
    this._super(params);
  },
  addNode: function (obj) {},
  removeNode: function (name) {},
  getNode: function (name) {},
  getNodesByType: function (type) {},
  update: function (elapsed) {},
  draw: function (ctx) {},
  pointInBounds: function (point) {},
  eventsCallback: function (type, evt) {}
});
