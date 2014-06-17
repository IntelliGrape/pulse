var pulse = pulse || {};
pulse.Engine = PClass.extend({
  init:function(params) {

  },
  getWindowOffset:function() {},
  bindEvents:function() {},
  go:function(tick, loop) {},
  loop:function(autoContinue) {},
  update:function(elapsed) {},
  draw:function() {},
  windowEvent:function(rawEvt) {},
  addScene:function(scene) {},
  removeScene:function(scene) {},
  activateScene:function(scene) {},
  deactivateScene:function(scene) {}
});
