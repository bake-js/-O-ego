import { html } from "@bake-js/-o-id/dom";

function component(self) {
  return html`
    <button
      class="button"
      size="${self.size}"
      ${self.disabled ? "disabled" : ""}>
      ${self.content}
    </button>
  `;
}

export default component;
