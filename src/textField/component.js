import { html } from "@bake-js/-o-id/dom";
import icon from "./icon";

function component(self) {
  return html`
    <div class="textField__container">
      <label
        class="textField__label"
        for="${self.id}">
          ${self.label}
      </label>
      <div class="textField__wrapper">
        <input
          class="textField"
          id="${self.id}"
          inputmode="${self.inputMode}"
          name="${self.name}"
          type="${self.type}"
          value="${self.value}"
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
