var pulse = pulse || {};
pulse.Texture = pulse.Asset.extend({
  init: function (params) {
    this._super(params);
  },
  load: function () {},
  width: function () {},
  height: function () {},
  slice: function (x, y, width, height) {},

});
