import { html, css } from 'lit-element'
import {
  ThingsEditorProperty,
  ThingsEditorPropertyStyles
} from '@things-factory/board-ui/client/modeller-module'

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
      <label id="label"><i18n-msg msgid="keyword">msg</i18n-msg></label>
      <input type="text" value=${props.value} />
    `
  }

  static get styles() {
    return [
      ThingsEditorPropertyStyles, 
      css`
        #label {
          color:red;
        }
      `
    ]
  }
}

customElements.define(<%= editorClassName %>.is, <%= editorClassName %>)
