var pulse = pulse || {};
pulse.plugin = pulse.plugin || {};
pulse.plugin.Plugin = PClass.extend({
  init: function () {
  },
  subscribe: function (objectType, functionName, callbackType, callback) {
  },
  invoke: function (objectType, functionName, callbackType, sender, params) {
  },
  unsubscribe: function (pluginCallback) {
  }
});

pulse.plugin.PluginCallback = PClass.extend({
  init: function (params) {
  }
});


