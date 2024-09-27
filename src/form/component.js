import { html } from "@bake-js/-o-id/dom";
import { template } from "./interfaces";

function component(self) {
  return html`
    <form class="form">
      ${self[template]}
    </form>
  `;
}

export default component;
