import { html } from "@bake-js/-o-id/dom";

function component() {
  return html`
    <form class="form">
      <slot></slot>
    </form>
  `;
}

export default component;
