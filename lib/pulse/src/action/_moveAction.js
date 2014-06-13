var pulse = pulse || {};
pulse.MoveAction = pulse.Action.extend({
  init: function (params) {
    this._super(params);
  },
  start: function (oframe) {},
  pause: function () {},
  stop: function () {},
  complete: function () {},
  update: function (elapsed) {},

});
