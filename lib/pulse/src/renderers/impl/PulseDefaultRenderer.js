/*global PClass:true */

/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

/**
 *
 * */
pulse.PulseDefaultRenderer = function PulseDefaultRenderer() {

  //Make a layers holder
  var _this = this;


  this.clearLayer = function (layer) {
    layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
  };

  this.addLayer = function (layer) {
    layer.canvas = getLiveCanvas(layer);
    layer.context = layer.canvas.getContext("2d");
    return layer;
  };

  this.removeLayer = function (layer) {
    layer.containerElement.removeChild(layer.canvas);
  };

  this.updateMultipleLayers = function (layers) {
    _updateLiveLayers(layers);
  };

  this.clearLayerSection = function (x, y, width, height, layerObj) {
    return layerObj.context.clearRect(
      x, y,
      width, height
    );
  };

  this.addVisualToLayer = function (visualObj, layerObj) {
    /**
     * The html canvas element that represents this visual node.
     * @type {HTMLCanvas}
     */
    visualObj.canvas = document.createElement('canvas');

    /**
     * 2d context for the canvas element for this visual node.
     * @type {CanvasRenderingContext2D}
     */
    visualObj.context = this.canvas.getContext('2d');

    return visualObj;
  };

  this.removeVisualFromLayer = function (visualObj, layerObj) {
    var clear = visualObj.boundsPrevious;
    return _this.clearLayerSection(
      clear.x, clear.y,
      clear.width, clear.height,
      layerObj
    );
  };

  this.updateVisual = function (visualObj, layerObj) {
    // update the canvas element
    if (visualObj.canvas.width !== visualObj.size.width) {
      visualObj.canvas.width = visualObj.size.width;
    }
    if (visualObj.canvas.height !== visualObj.size.height) {
      visualObj.canvas.height = visualObj.size.height;
    }
    //Do some rendering update??
  };

  this.drawPlainVisualObject = function (visualObj, layerObj) {
    //Get Context
    var ctx = layerObj.context;

    if (visualObj.canvas.width === 0 || visualObj.canvas.height === 0) {
      return;
    }

    ctx.save();

    // apply the alpha for visual node
    ctx.globalAlpha = visualObj.alpha / 100;

    // apply the rotation if needed
    if (visualObj.rotation !== 0) {
      var rotationX = visualObj.positionTopLeft.x +
        visualObj.size.width * Math.abs(visualObj.scale.x) / 2;
      var rotationY = visualObj.positionTopLeft.y +
        visualObj.size.height * Math.abs(visualObj.scale.y) / 2;

      ctx.translate(rotationX, rotationY);
      ctx.rotate((Math.PI * (visualObj.rotation % 360)) / 180);
      ctx.translate(-rotationX, -rotationY);
    }

    // apply the scale
    ctx.scale(visualObj.scale.x, visualObj.scale.y);

    var px = visualObj.positionTopLeft.x / visualObj.scale.x;
    if (visualObj.scale.x < 1) {
      px -= visualObj.size.width;
    }
    var py = visualObj.positionTopLeft.y / visualObj.scale.y;
    if (visualObj.scale.y < 1) {
      py -= visualObj.size.height;
    }

    if (visualObj.shadowEnabled) {
      ctx.shadowOffsetX = visualObj.shadowOffsetX;
      ctx.shadowOffsetY = visualObj.shadowOffsetY;
      ctx.shadowBlur = visualObj.shadowBlur;
      ctx.shadowColor = visualObj.shadowColor;
    }

    // draw the canvas
    ctx.drawImage(
      visualObj.canvas,
      px,
      py
    );

    ctx.restore();

  };

  this.drawSpriteVisualObject = function (visualObj, layerObj) {
    //Get Context
    var ctx = layerObj.context;

    // Clear my canvas
    ctx.clearRect(
      0, 0,
      visualObj.canvas.width, visualObj.canvas.height
    );

    // Draws the texture to this visual's canvas
    ctx.drawImage(
      visualObj.imageCanvasToBeDrawn,
      0, 0,
      visualObj.size.width, visualObj.size.height
    );

  };

  this.drawCanvasLabelVisualObject = function (visualObj, layerObj) {
    //Get Context
    var ctx = layerObj.context;

    // skip if no size
    if(visualObj.size.width === 0 || visualObj.size.height === 0) {
      return;
    }

    // Clear my canvas
    ctx.clearRect(
      0, 0,
      visualObj.canvas.width, visualObj.canvas.height
    );

    // Draws the texture to this visual's canvas

    ctx.textBaseline = visualObj.textBaseline;

    var fontstr = visualObj.fontSize + "px " + visualObj.font;
    if(visualObj.bold) {
      fontstr = "bold " + fontstr;
    }
    if(visualObj.italic) {
      fontstr = "italic " + fontstr;
    }
    ctx.font = fontstr;

    if(visualObj.fillColor != "transparent") {
      ctx.fillStyle = visualObj.fillColor;
      ctx.fillText(visualObj.text, 0, visualObj.size.height / 2);
    }

    if(visualObj.strokeColor != "transparent" && visualObj.strokeWidth !== 0) {
      ctx.lineWidth = visualObj.strokeWidth;
      ctx.strokeStyle = visualObj.strokeColor;
      ctx.strokeText(visualObj.text, 0, visualObj.size.height / 2);
    }

  };

  this.drawBitmapLabelVisualObject = function (visualObj, layerObj) {
    //Get Context
    var ctx = layerObj.context;

    // Clear my canvas
    ctx.clearRect(
      0, 0,
      visualObj.canvas.width, visualObj.canvas.height
    );

    /// Draws the texture to this visual's canvas
    var vert = null;
    var cursor = 0;
    for (var i = 0; i < visualObj.verts.length; i++) {
      vert = visualObj.verts[i];
      if(vert.size.width !== 0 && vert.size.height !== 0) {
        ctx.drawImage(
          visualObj.font.image,
          vert.position.x, vert.position.y,
          vert.size.width, vert.size.height,
          cursor + vert.offset.x, vert.offset.y,
          vert.size.width, vert.size.height
        );
      }
      cursor += vert.xAdvance;
    }
  };

  //private
  function getLiveCanvas(layer) {
    var liveCanvas = document.createElement('canvas');
    liveCanvas.width = layer.layerWidth;
    liveCanvas.height = layer.layerHeight;
    liveCanvas.style.position = 'absolute';
    liveCanvas.id = 'live:' + layer.name;
    return liveCanvas;
  }

  function _updateLiveLayers(_layers) {
    var layers = [];
    //Clear the layers
    for (var layerName in _layers) {
      if (_layers.hasOwnProperty(layerName)) {
        _layers[layerName].containerElement.removeChild(_layers[layerName].canvas);
        layers.push(_layers[layerName]);
      }
    }

    //Sort as per zIndex
    layers = layers.sort(function (a, b) {
      return a.zIndex - b.zIndex;
    });

    for (var key in layers) {
      if (layers.hasOwnProperty(key) && layers[key].isActive) {
        layers[key].containerElement.appendChild(layers[key].canvas);
      }
    }
  }
};