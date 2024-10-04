import { css } from "@bake-js/-o-id/dom";

function style() {
  return css`
    *,
    *::after,
    *::before {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      transition: all 0.2s ease-out;
    }

    .button {
      background-color: var(--bg-brand-solid);
      border: none;
      border-radius: var(--border-radius-200);
      color: var(--text-white);
      cursor: pointer;
      font-family: var(--font-family);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-sm);
      height: 36px;
      padding: 0 var(--spacing-4);

      &:disabled {
        background-color: var(--bg-disabled);
      }

      &:not(:disabled) {
        &:focus-visible {
          box-shadow: var(--focus-ring);
          outline: 0;
        }

        &:hover {
          background-color: var(--bg-brand-solid_hover);
        }
      }
    }
  `;
}

export default style;
