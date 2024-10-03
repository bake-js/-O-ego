import { html } from "@bake-js/-o-id/dom";

function component(self) {
  return html`
    <button
      class="button"
      ${self.disabled ? "disabled" : ""}>
      ${self.content}
    </button>
  `;
}

export default component;
