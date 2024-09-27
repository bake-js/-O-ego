import { html } from "@bake-js/-o-id/dom";

function component(self) {
  return html`
    <form class="form">
      ${self.template}
    </form>
  `;
}

export default component;
