var pulse = pulse || {};
pulse.EventManager = PClass.extend({
  init: function (params) {},
  bind: function (type, callback) {},
  unbind: function (type) {},
  unbindFunction: function (type, callback) {},
  hasEvent: function (type) {},
  raiseEvent: function (type, evt) {},
  checkType: function (type) {}
});
