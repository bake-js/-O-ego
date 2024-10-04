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
      font-weight: var(--font-weight-semibold);
      padding: 0 var(--spacing-4);

      &[size="sm"],
      &[size="md"] {
        font-size: var(--font-size-sm);
        height: 36px;
        line-height: var(--line-height-sm);
      }

      &[size="md"] {
        height: 40px;
      }

      &[size="lg"],
      &[size="xl"] {
        font-size: var(--font-size-md);
        height: 44px;
        line-height: var(--line-height-md);
      }

      &[size="xl"] {
        height: 48px;
      }

      &[size="2xl"] {
        font-size: var(--font-size-lg);
        height: 60px;
        line-height: var(--line-height-lg);
      }

      &:disabled {
        background-color: var(--bg-disabled);
        color: var(--text-disabled);
        cursor: auto;
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
