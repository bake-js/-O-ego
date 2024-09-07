import { html } from "@bake-js/-o-id/dom";

function component(self) {
  return html`
    <span class="required">
      ${self.text}
    </span>
  `;
}

export default component;
