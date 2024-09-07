import {
  attributeChanged,
  connected,
  define,
  disconnected,
} from "@bake-js/-o-id";
import Echo from "@bake-js/-o-id/echo";
import on, { value } from "@bake-js/-o-id/event";
import dispatchEvent from "../dispatchEvent";
import { attached, changed, removed } from "./interfaces";
import interpolation from "./interpolation";

@define("o-data-source")
class DataSource extends Echo(HTMLElement) {
  #controller;
  #url;

  get url() {
    return (this.#url ??= "");
  }

  @attributeChanged("url")
  @dispatchEvent("rerouted")
  set url(value) {
    this.#url = value;
  }

  async get(payload) {
    this.#controller?.abort();
    this.#controller = new AbortController();

    const url = this.url.replace(/{{\s*(\w+)\s*}}/g, (_, path) =>
      interpolation(path, { payload }),
    );

    try {
      const response = await fetch(url, { signal: this.#controller.signal });
      const data = await response.json();
      this.dispatchEvent(new CustomEvent("success", { detail: data }));
    } catch {
      this.dispatchEvent(new CustomEvent("error"));
    }
    return this;
  }
}

export default DataSource;
