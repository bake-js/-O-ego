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
import component from "../requiredValidator/component";
import {
  attached,
  removed,
  setState,
  syncAttribute,
} from "../requiredValidator/interfaces";
import style from "../requiredValidator/style";
import Validator, { validatedCallback } from "../validator";

@define("o-min-validator")
@paint(component, style)
class MinValidator extends Validator(Echo(HTMLElement)) {
  #disabled;
  #internals;
  #message;
  #value;

  get disabled() {
    return (this.#disabled ??= false);
  }

  @attributeChanged("disabled", booleanAttribute)
  @dispatchEvent("redisabed")
  @joinCut(syncAttribute)
  set disabled(value) {
    this.#disabled = value;
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

  get value() {
    return this.#value;
  }

  @attributeChanged("value")
  @dispatchEvent("changed")
  @joinCut(syncAttribute)
  set value(value) {
    this.#value = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  @connected
  @joinCut(syncAttribute)
  [attached]() {
    this.dispatchEvent(new CustomEvent("attached"));
    return this;
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("min");
    this.dispatchEvent(new CustomEvent("removed"));
    return this;
  }

  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("min")
        : this.parentElement.setAttribute("min", this.value);
    }
    return this;
  }

  [validatedCallback]() {
    this.parentElement.validity.rangeUnderflow
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default MinValidator;
