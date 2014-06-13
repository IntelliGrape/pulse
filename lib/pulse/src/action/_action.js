var pulse = pulse || {};

pulse.Action = pulse.Node.extend({
  init: function (params) {
    this.super(params);
  },
  start: function(){},
  pause: function(){},
  stop: function() {},
  complete: function(){}
});