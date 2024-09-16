import { html } from "@bake-js/-o-id/dom";
import icon from "./icon";

function component(self) {
  return html`
    <div class="textField__container">
      <label
        class="textField__label"
        ${self.id ? `for="${self.id}"` : ""}
      >
          ${self.label}
      </label>
      <div class="textField__wrapper">
        <input
          class="textField"
          ${self.id ? `id="${self.id}"` : ""}
          ${self.inputMode ? `inputmode="${self.inputMode}"` : ""}
          ${self.max ? `max="${self.max}"` : ""}
          ${self.maxLength ? `maxlength="${self.maxLength}"` : ""}
          ${self.min ? `min="${self.min}"` : ""}
          ${self.minLength ? `minlength="${self.minLength}"` : ""}
          ${self.name ? `name="${self.name}"` : ""}
          ${self.type ? `type="${self.type}"` : ""}
          ${self.value ? `value="${self.value}"` : ""}
          ${self.readonly ? "readonly" : ""}
          ${self.required ? "required" : ""}
        />
        <span class="textField__alert">
          ${icon}
        </span>
      </div>
      <slot></slot>
    </div>
  `;
}

export default component;
