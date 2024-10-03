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
      background-color: var(--color-primary-600);
      border: none;
      border-radius: var(--border-radius-200);
      color: #ffffff;
      cursor: pointer;
      font-family: var(--font-family);
      font-size: var(--font-size-sm);
      font-weight: 600;
      line-height: var(--line-height-sm);
      height: 36px;
      padding: 0 var(--spacing-4);

      &:disabled {
        background-color: var(--color-primary-200);
      }

      &:not(:disabled) {
        &:focus {
          box-shadow: 0 0 4px 4px var(--color-primary-100);
          outline: 0;
        }

        &:hover {
          background-color: var(--color-primary-700);
        }
      }
    }
  `;
}

export default style;
