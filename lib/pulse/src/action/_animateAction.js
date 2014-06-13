var pulse = pulse || {};
pulse.AnimateAction = pulse.Action.extend({
  init: function (params) {
    this._super(params);
  },
  bounds: function(){},
  getFrame: function(){},
  start: function() {},
  pause: function(){},
  stop: function(){},
  complete: function() {},
  update: function() {}
});