/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

/**
 * Enum Holder declaration if needed.
 */
pulse.enum = pulse.enum || {};


/**
 * Defines the type of visual object. Use as Enum for renderer implementations.
 * */
pulse.enum.VisualObjectType = {

  /**
   * Defines a plain Visual class object. Not inherited by others. Parent Visual class object.
   * */
  VISUAL: "VISUAL",

  /**
   * Sprite visual object.
   * */
  SPRITE: "SPRITE",

  /**
   * Sprite visual object.
   * */
  BITMAP_LABEL: "BITMAP LABEL",

  /**
   * Sprite visual object.
   * */
  CANVAS_LABEL: "CANVAS LABEL"

};

