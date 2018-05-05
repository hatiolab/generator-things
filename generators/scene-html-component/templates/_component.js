/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'textarea',
    label: 'config',
    name: 'config'
  }]
}

import {
  Component,
  HTMLOverlayContainer,
  ScriptLoader,
  error
} from '@hatiolab/things-scene';

export default class <%= componentClassName %> extends HTMLOverlayContainer {

  static get nature() {
    return NATURE;
  }

  oncreate_element(div) {
    this._anchor = document.createElement('div')
    this._anchor.style.width = '100%';
    this._anchor.style.height = '100%';

    this.element.appendChild(this._anchor)

    ScriptLoader.load([
      'https://d3js.org/d3.v4.min.js',
      'https://naver.github.io/billboard.js/release/latest/dist/billboard.min.js'
    ], [
      'https://naver.github.io/billboard.js/release/latest/dist/billboard.min.css'
    ]).then(() => {

      requestAnimationFrame(() => {

        this.chart = bb.generate({
          bindto: this._anchor,
          data: Object.assign({}, this.config, {
            columns: this.data
          })
        });

        this.reposition()
      })
    }, error);
  }

  dispose() {
    this.chart && this.chart.destroy()
    delete this.chart
    delete this._anchor

    super.dispose();
  }

  /*
   * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
   * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
   *
   * ThingsComponent state => HTML element properties
   */
  setElementProperties(div) {
  }

  /*
   * 컴포넌트가 ready 상태가 되거나, 컴포넌트의 속성이 변화될 시 setElementProperties 뒤에 호출된다.
   * 변화에 따른 기본적인 html 속성이 super.reposition()에서 진행되고, 그 밖의 작업이 필요할 때, 오버라이드 한다.
   */
  reposition() {
    super.reposition()

    if(!this.chart)
      return

    this.chart.load({
      columns: this.data
    });
    // TODO how to resize..
  }

  get config() {
    var {
      config,
      data
    } = this.state

    if(typeof(config) !== 'object') {
      try {
        eval(`config = ${config}`)
      } catch (e) {
        scene.error(e)
      }
    }

    return config
  }

  get tagName() {
    return '<%= componentName %>'
  }
}

Component.register('<%= componentName %>', <%= componentClassName %>);
