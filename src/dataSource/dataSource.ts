import {
  attributeChanged,
  connected,
  define,
  disconnected,
} from "@bake-js/-o-id";
import Echo from "@bake-js/-o-id/echo";
import on, { value } from "@bake-js/-o-id/event";
import dispatchEvent from "../dispatchEvent";
import http from "./http";
import { attached, changed, removed } from "./interfaces";
import { resetController } from "./interfaces";
import interpolation from "./interpolation";
import Url from "./url";
import willCut from "./willCut";

@define("ego-data-source")
class DataSource extends Echo(HTMLElement) {
  #controller;
  #url = new Url();

  get url() {
    return this.#url.value;
  }

  @attributeChanged("url")
  @dispatchEvent("rerouted")
  set url(value) {
    this.#url.value = value;
  }

  @willCut(resetController)
  async delete(payload) {
    const { data, error } = await http
      .delete(this.#url.bind(payload))
      .signal(this.#controller.signal)
      .json();

    data
      ? this.dispatchEvent(new CustomEvent("deleted", { detail: data }))
      : this.dispatchEvent(new CustomEvent("undeleted", { detail: error }));

    return this;
  }

  @willCut(resetController)
  async get(payload) {
    const { data, error } = await http
      .get(this.#url.bind(payload))
      .signal(this.#controller.signal)
      .json();

    data
      ? this.dispatchEvent(new CustomEvent("retrived", { detail: data }))
      : this.dispatchEvent(new CustomEvent("unretrived", { detail: error }));

    return this;
  }

  @willCut(resetController)
  async post(payload) {
    const { data, error } = await http
      .post(this.#url.bind(payload))
      .body(payload)
      .signal(this.#controller.signal)
      .json();

    data
      ? this.dispatchEvent(new CustomEvent("posted", { detail: data }))
      : this.dispatchEvent(new CustomEvent("unposted", { detail: error }));

    return this;
  }

  @willCut(resetController)
  async put(payload) {
    const { data, error } = await http
      .put(this.#url.bind(payload))
      .body(payload)
      .signal(this.#controller.signal)
      .json();

    data
      ? this.dispatchEvent(new CustomEvent("updated", { detail: data }))
      : this.dispatchEvent(new CustomEvent("unupdated", { detail: error }));

    return this;
  }

  [resetController]() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    return this;
  }
}

export default DataSource;
