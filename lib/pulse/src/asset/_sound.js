var pulse = pulse || {};
pulse.Sound = pulse.Asset.extend({
  init: function (params) {
    this._super(params);
  },
  load: function () {},
  play: function () {},
  pause: function () {},
  stop: function () {},
  finished: function () {},
  initFlashPlayer: function () {}
});
