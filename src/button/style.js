import { css } from "@bake-js/-o-id/dom";

function style(self) {
  return css`
    :host {
      --ego-button-font-size-sm: var(--font-size-sm);
      --ego-button-font-size-md: var(--font-size-sm);
      --ego-button-font-size-lg: var(--font-size-md);
      --ego-button-font-size-xl: var(--font-size-md);
      --ego-button-font-size-2xl: var(--font-size-lg);
      --ego-button-line-height-sm: var(--line-height-sm);
      --ego-button-line-height-md: var(--line-height-sm);
      --ego-button-line-height-lg: var(--line-height-md);
      --ego-button-line-height-xl: var(--line-height-md);
      --ego-button-line-height-2xl: var(--line-height-lg);
      --ego-button-height-sm: 36px;
      --ego-button-height-md: 40px;
      --ego-button-height-lg: 44px;
      --ego-button-height-xl: 48px;
      --ego-button-height-2xl: 60px;
    }

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
      font-size: var(--ego-button-font-size-${self.size});
      font-weight: var(--font-weight-semibold);
      height: var(--ego-button-height-${self.size});
      line-height: var(--ego-button-line-height-${self.size});
      padding: 0 var(--spacing-4);

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
