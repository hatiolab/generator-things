import { html, css } from '@polymer/lit-element'
import { ThingsEditorProperty } from '@things-factory/board-ui/client/modeller-module'

export default class <%= editorClassName %> extends ThingsEditorProperty {
  static get is() {
    return 'property-editor-<%= editorName %>'
  }

  static get properties() {
    return {
      value: String
    }
  }

  editorTemplate(props) {
    return html`
      <input type="text" value=${props.value}>
    `
  }

  static get styles() {
    return [
      ThingsEditorPropertyStyles, 
      css`label {color:red;}`
    ]
  }
}

customElements.define(<%= editorClassName %>.is, <%= editorClassName %>)
