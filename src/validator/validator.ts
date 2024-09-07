import { connected, disconnected } from "@bake-js/-o-id";
import { attached, removed } from "./interfaces";

const validator = (Klass) => {
  class Validator extends Klass {
    #controller = new AbortController();

    static get callback() {
      return callback;
    }

    @connected
    [attached]() {
      this.parentElement.addEventListener(
        "changed",
        (event) => this.validationCallback(event),
        {
          signal: this.#controller.signal,
        },
      );

      this.parentElement.addEventListener(
        "invalidated",
        (event) => this.validationCallback(event),
        {
          signal: this.#controller.signal,
        },
      );

      return this;
    }

    validationCallback() {
      return this;
    }

    @disconnected
    [removed]() {
      this.#controller.abort();
      return this;
    }
  }

  return Validator;
};

export default validator;
