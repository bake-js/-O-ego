import { connected, disconnected } from "@bake-js/-o-id";
import { attached, removed, validatedCallback } from "./interfaces";

const validator = (Klass) => {
  class Validator extends Klass {
    #controller = new AbortController();

    static get callback() {
      return callback;
    }

    @connected
    [attached]() {
      const listener = () => this[validatedCallback]();
      const options = {
        signal: this.#controller.signal,
      };

      this.parentElement.addEventListener("changed", listener, options);
      this.parentElement.addEventListener("invalidated", listener, options);
      return this;
    }

    [validatedCallback]() {
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
