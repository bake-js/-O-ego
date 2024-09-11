import {
  attributeChanged,
  connected,
  define,
  disconnected,
} from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import booleanAttribute from "../booleanAttribute";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import Validator, { validatedCallback } from "../validator";
import component from "./component";
import { attached, removed, setState } from "./interfaces";
import style from "./style";

@define("o-required-validator")
@paint(component, style)
class RequiredValidator extends Validator(Echo(HTMLElement)) {
  #disabled;
  #internals;
  #message;

  get disabled() {
    return (this.#disabled ??= false);
  }

  @attributeChanged("disabled", booleanAttribute)
  @dispatchEvent("redisabed")
  set disabled(value) {
    this.#disabled = value;

    if (this.isConnected) {
      this.parentElement.setAttribute("required", !value);
    }
  }

  get message() {
    return (this.#message ??= "");
  }

  @attributeChanged("message")
  @dispatchEvent("messaged")
  set message(value) {
    this.#message = value;

    if (this.isPainted) {
      this.shadowRoot.querySelector("span").innerHTML = value;
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  @connected
  [attached]() {
    if (this.isConnected) {
      this.parentElement.setAttribute("required", !this.disabled);
    }

    this.dispatchEvent(new CustomEvent("attached"));
    return this;
  }

  @disconnected
  [removed]() {
    this.dispatchEvent(new CustomEvent("removed"));
    return this;
  }

  [validatedCallback]() {
    this.parentElement.validity.valueMissing
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default RequiredValidator;
