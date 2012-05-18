/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

/**
 * The base type for all objects added to the world.
 * @param {object} [params] parameters that can be set as initialized options
 * on the node
 * @config {string} [name] name of the node
 * @class The base node object.
 * @author PFP
 * @copyright 2012 Paranoid Ferret Productions
 */
pulse.Node = PClass.extend(
/** @lends pulse.Node.prototype */
{
  /** @constructs */
  init: function(params) {

    // Plugin support.
    pulse.plugins.invoke(
      'pulse.Node',
      'init',
      pulse.plugin.PluginCallbackTypes.onEnter,
      this,
      arguments);

    params = pulse.util.checkParams(params, {
      name : "Node" + pulse.Node.nodeIdx++
    });

    /**
     * The name of the node.
     * @type {string}
     */
    this.name = params.name;


    /**
     * Parent container of this node. Will be updated by parent when added or
     * removed.
     * @type {pulse.Layer}
     */
    this.parent = null;

    /**
     * Determines whether or not this node should run in debug mode. This allows
     * debugging on a node by node basis rather than just globally.
     * @type {boolean}
     */
    this.debugging = false;

    /**
     * @private
     * Private properties of the node. Should not need or use these.
     * @type {object}
     */
    this._private = { };

    // Plugin support.
    pulse.plugins.invoke(
      'pulse.Node',
      'init',
      pulse.plugin.PluginCallbackTypes.onExit,
      this,
      arguments);
  },

  /**
   * Update function called on each loop in the engine
   * @param {number} elapsed the elapsed time since last call in
   * milliseconds
   */
  update : function(elapsed) {

    // Plugin support.
    pulse.plugins.invoke(
      'pulse.Node',
      'update',
      pulse.plugin.PluginCallbackTypes.onEnter,
      this,
      arguments);

    // Nothing is updated by default

    // Plugin support.
    pulse.plugins.invoke(
      'pulse.Node',
      'update',
      pulse.plugin.PluginCallbackTypes.onExit,
      this,
      arguments);
  }

});

// Static index that's incremented whenever a node is created.
// Used for uniquely naming nodes if a name is not specified.
pulse.Node.nodeIdx = 0;