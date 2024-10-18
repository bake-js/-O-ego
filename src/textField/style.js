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

    .textField__container {
      align-items: start;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      position: relative;
      width: var(--width-xxs);
    }

    .textField__label {
      color: var(--text-secondary);
      font-family: var(--font-family);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-sm);
    }

    .textField__wrapper {
      position: relative;
      width: inherit;
    }

    .textField {
      appearance: none;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-family: var(--font-family);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-regular);
      height: 44px;
      line-height: var(--line-height-md);
      padding: var(--spacing-md) var(--spacing-lg);
      width: 100%;
    }

    .textField[type="number"] {
      -moz-appearance: textfield;
    }

    .textField:active,
    .textField:hover {
      outline: 0;
    }

    .textField:focus {
      border-color: var(--border-brand);
      outline: 0;
    }

    .textField:disabled,
    .textField:read-only {
      background-color: var(--bg-secondary);
      border-color: var(--border-primary);
      box-shadow: none;
      color: var(--text-disabled);
    }

    .textFiedl::placeholder {
      color: var(--text-placeholder);
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
      color: var(--text-error-primary);
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
        border-color: var(--border-error);
        padding-right: 40px;
      }
    }
  `;
}

export default style;
