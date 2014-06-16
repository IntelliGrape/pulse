/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

pulse.RendererInterface = function(){

    var _this = this;

    var renderer;

    /**
     * Implements a Renderer
     * */
    this.implement = function(impl){
        renderer = impl;
        return _this;
    };

    this.addScene = function(){

    };
};