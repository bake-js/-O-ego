import { css } from "@bake-js/-o-id/dom";

function style() {
  return css`
    .form {
      align-items: start;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-5);
      padding: var(--spacing-6);
    }
  `;
}

export default style;
