import { css } from "@bake-js/-o-id/dom";

function style() {
  return css`
    *,
    *::after,
    *::before {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .textField__container {
      align-items: start;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      position: relative;
      width: 320px;
    }

    .textField__label {
      color: var(--color-gray-700);
      font-family: var(--font-family);
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: var(--line-height-sm);
    }

    .textField__wrapper {
      position: relative;
      width: inherit;
    }

    .textField {
      appearance: none;
      background-color: white;
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-200);
      color: var(--color-gray-500);
      font-family: var(--font-family);
      font-size: var(--font-size-md);
      font-weight: 400;
      height: 44px;
      line-height: var(--line-height-md);
      padding: var(--spacing-2) var(--spacing-3);
      width: 100%;
    }

    .textField[type="number"] {
      -moz-appearance: textfield;
    }

    .textField:active,
    .textField:hover {
      color: var(--color-gray-900);
      outline: 0;
    }

    .textField:focus {
      border-color: var(--color-primary-300);
      box-shadow: 0 0 4px 4px var(--color-primary-100);
      color: var(--color-gray-900);
      outline: 0;
    }

    .textField:read-only {
      background-color: var(--color-gray-50);
      border-color: var(--color-gray-300);
      box-shadow: none;
      color: var(--color-gray-500);
    }

    .textField::-webkit-autofill,
    .textField::-webkit-autofill:hover, 
    .textField::-webkit-autofill:focus, 
    .textField::-webkit-autofill:active {
      transition: background-color 9999999999s ease-in-out 0s
    }

    .textField::-webkit-outer-spin-button,
    .textField::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .textField__alert {
      align-items: center;
      display: none;
      height: 16px;
      justify-content: center;
      position: absolute;
      right: 14px;
      top: 14px;
      width: 16px;
    }

    :host(:state(invalid)) {
      .textField__alert {
        display: flex;
      }

      .textField {
        border-color: var(--color-error-300);
        padding-right: 40px;
      }

      .textField:focus {
        box-shadow: 0 0 4px 4px var(--color-error-100);
      }
    }
  `;
}

export default style;
