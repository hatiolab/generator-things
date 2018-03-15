/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import COMPONENT_IMAGE from './<%= componentName %>.png';

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'format',
    name: 'format'
  }, {
    type: 'number',
    label: 'count',
    name: 'count',
    placeholder: 1
  }, {
    type: 'number',
    label: 'period',
    name: 'period',
    placeholder: 'milli-seconds'
  }]
}

import { Component, RectPath, Shape, ScriptLoader, error } from '@hatiolab/things-scene';

export default class <%= componentClassName %>  extends RectPath(Shape) {

  static get nature() {
    return NATURE;
  }

  static get image() {
    if (!<%= componentClassName %>._image) {
      <%= componentClassName %>._image = new Image()
      <%= componentClassName %>._image.src = COMPONENT_IMAGE
    }

    return <%= componentClassName %>._image
  }

  ready() {
    ScriptLoader.load(['http://chancejs.com/chance.min.js'])
    .then(() => {
      if (!this.app.isViewMode)
        return;

      this._init<%= componentClassName %>()
    }, error)
  }

  dispose() {
    super.dispose();
    this._stopRepeater();
  }

  random() {
    var {
      format = 'd100',
      count = 1
    } = this.state

    if (!format || !count)
      return

    this.data = chance.n(chance[format], count)
  }

  _init<%= componentClassName %>() {
    this._stopRepeater();
    this._startRepeater();
  }

  _startRepeater() {
    if (this.getState('period')) {
      this.repeatTimer = setInterval(function () {
        this.random();
      }.bind(this), this.getState('period'));
    }

    this.random();
  }

  _stopRepeater() {
    if (this.repeatTimer)
      clearTimeout(this.repeatTimer)
  }

  _draw(context) {
    var {
      left,
      top,
      width,
      height
    } = this.bounds;

    context.beginPath();
    context.drawImage(<%= componentClassName %>.image, left, top, width, height);
  }

  ondblclick(e) {
    this.random()
  }

  get hasTextProperty() {
    return false
  }

  get controls() { }
}

Component.register('<%= componentName %>', <%= componentClassName %>);
