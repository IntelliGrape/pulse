var pulse = pulse || {};
pulse.Sprite = pulse.Visual.extend({
  init: function (params) {
    this._super(params);
  },
  loaded: function () {},
  addAction: function (params) {},
  inCurrentBounds: function (x, y) {},
  getCurrentFrame: function () {},
  update: function (elapsed) {},
  draw: function (ctx) {},
  calculateProperties: function () {},
  killDrag: function (evt) {},
  eventsCallback: function (type, evt) {},
  itemDroppedCallback: function (e) {}
});
