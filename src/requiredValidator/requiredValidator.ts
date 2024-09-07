import {
  attributeChanged,
  connected,
  define,
  disconnected,
} from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import dispatchEvent from "../dispatchEvent";
import Validator from "../validator";
import component from "./component";
import { attached, removed, setState } from "./interfaces";
import style from "./style";

@define("o-required-validator")
@paint(component, style)
class RequiredValidator extends Validator(Echo(HTMLElement)) {
  #internals;
  #text;

  get text() {
    return (this.#text ??= "");
  }

  @attributeChanged("text")
  @dispatchEvent("retexted")
  set text(value) {
    this.#text = value;
    if (this.isConnected)
      this.shadowRoot.querySelector("span").innerHTML = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  @connected
  [attached]() {
    this.dispatchEvent(new CustomEvent("attached"));
    return this;
  }

  validationCallback() {
    this.parentElement.validity.valueMissing
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }

  @disconnected
  [removed]() {
    this.dispatchEvent(new CustomEvent("removed"));
    return this;
  }
}

export default RequiredValidator;
