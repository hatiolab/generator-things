import { html } from '@polymer/lit-element'
import { ThingsEditorProperty } from '@hatiolab/things-shell/things-module'

export default class <%= editorClassName %> extends ThingsEditorProperty {
  static get is() {
    return 'property-editor-<%= editorName %>'
  }

  static get properties() {
    return {
      value: String
    }
  }

  _render(props) {
    return html`
      <input type="text" value=${props.value}>
    `
  }

  static get styleTemplate() {
    return html`label {color:red;}`
  }
}

customElements.define(<%= editorClassName %>.is, <%= editorClassName %>)
