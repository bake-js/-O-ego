import { html } from "@bake-js/-o-id/dom";

function component(self) {
  html`
    <button>${self.content}</button>
  `;
}

export default component;
