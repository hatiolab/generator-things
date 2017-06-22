/*
 * Copyright (c) 2017, HatioLab Inc. All right reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'value',
    name: 'value',
    property: 'value'
  },{
    type: 'angle',
    label: 'angle property',
    name: 'propAngle',
    property: 'propAngle'
  },{
    type: 'string',
    label: 'string property',
    name: 'propString',
    property: 'propString'
  },{
    type: 'color',
    label: 'color property',
    name: 'propColor',
    property: 'propColor'
  }]
}

var { ValueHolder, RectPath, Shape } = scene

export default class <%= componentClassName %> extends ValueHolder(RectPath(Shape)) {

  _draw(context) {
    var {
      top,
      left,
      height,
      width,
      backgroundColor = 'transparent',
      reverse
    } = this.model;

    this.animOnValueChange(this.value);

    // background의 색상
    context.beginPath();
    context.rect(left, top, width, height);

    context.fillStyle = backgroundColor;
    context.fill();

    // value의 색상
    context.beginPath();

    var drawValue = width - width * Math.max(Math.min(this.animValue, 100), 0) / 100;
    drawValue = Math.max(Math.min(drawValue, width), 0);

    context.rect(left + drawValue, top, width - drawValue, height);

    this.drawFill(context);

    context.closePath();

    context.beginPath();

    context.rect(left, top, width, height);
  }

  _post_draw(context) {
    this.drawStroke(context);
    this.drawText(context);
  }

  get controls() {}

  get nature(){
    return NATURE;
  }
}

scene.Component.register('<%= componentTypeName %>', <%= componentClassName %>);
