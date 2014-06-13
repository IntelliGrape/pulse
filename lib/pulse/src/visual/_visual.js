var pulse = pulse || {};
pulse.Visual = pulse.Node.extend({init: function (params) {
  this._super(params);
},
  move: function (x, y) {},
  getAction: function (name) {},
  runAction: function (name, oframe) {},
  addAction: function (action) {},
  update: function (elapsed) {},
  draw: function (ctx) {},
  calculateProperties: function () {},
  on: function (type, callback) {},
  eventsCallback: function (type, evt) {}
});
