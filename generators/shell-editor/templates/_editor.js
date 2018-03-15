import { html } from '@polymer/polymer/polymer-element';
import { ThingsEditorProperty } from '@hatiolab/things-shell/things-module';

export default class <%= editorClassName %> extends ThingsEditorProperty {
  static get is() {
    return 'property-editor-<%= editorName %>';
  }

  static get editorTemplate() {
    return html`
    <input type="text" value="{{value::change}}">
    `;
  }

  static get styleTemplate() {
    return html`label {color:red;}`;
  }
}

customElements.define(<%= editorClassName %>.is, <%= editorClassName %>);
