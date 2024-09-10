import {
  attributeChanged,
  connected,
  define,
  disconnected,
  formAssociated,
  formReset,
} from "@bake-js/-o-id";
import { didPaint, paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on, { prevent, value } from "@bake-js/-o-id/event";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import booleanAttribute from "./booleanAttribute";
import component from "./component";
import {
  attached,
  changed,
  invalidated,
  removed,
  setFormValue,
  setState,
  setValidity,
} from "./interfaces";
import style from "./style";

@define("o-text-field")
@paint(component, style)
class TextField extends Echo(HTMLElement) {
  #controller;
  #id;
  #inputMode;
  #internals;
  #label;
  #name;
  #readonly;
  #required;
  #type;
  #value;

  get form() {
    return this.#internals.form;
  }

  get id() {
    return (this.#id ??= "");
  }

  @attributeChanged("id")
  @dispatchEvent("reidentified")
  @repaint
  set id(value) {
    this.#id = value;
  }

  get inputMode() {
    return this.#inputMode ?? this.type;
  }

  @attributeChanged("inputmode")
  @dispatchEvent("remoded")
  @repaint
  set inputMode(value) {
    this.#inputMode = value;
  }

  get label() {
    return (this.#label ??= "");
  }

  @attributeChanged("label")
  @dispatchEvent("relabelled")
  @repaint
  set label(value) {
    this.#label = value;
  }

  get name() {
    return (this.#name ??= "");
  }

  @attributeChanged("name")
  @dispatchEvent("renamed")
  @repaint
  set name(value) {
    this.#name = value;
  }

  get readonly() {
    return (this.#readonly ??= false);
  }

  @attributeChanged("readonly", booleanAttribute)
  @dispatchEvent("readonlyed")
  @repaint
  set readonly(value) {
    this.#readonly = value;
  }

  get required() {
    return (this.#required ??= false);
  }

  @attributeChanged("required", booleanAttribute)
  @dispatchEvent("requireded")
  @joinCut(setState)
  @joinCut(setValidity)
  @repaint
  set required(value) {
    this.#required = value;
  }

  get type() {
    return (this.#type ??= "text");
  }

  @attributeChanged("type")
  @dispatchEvent("retarget")
  @repaint
  set type(value) {
    this.#type = value;
  }

  get validationMessage() {
    return this.#internals.validationMessage;
  }

  get validity() {
    return this.#internals.validity;
  }

  get value() {
    return (this.#value ??= "");
  }

  @attributeChanged("value")
  @dispatchEvent("changed")
  @joinCut(setState)
  @joinCut(setValidity)
  set value(value) {
    this.#value = value;
    if (this.isPainted) this.shadowRoot.querySelector("input").value = value;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.#controller = new AbortController();
    this.#internals = this.attachInternals();
  }

  @connected
  [attached]() {
    this.dispatchEvent(new CustomEvent("attached"));
    return this;
  }

  @on.input("input", value)
  [changed](val) {
    this.value = val;
    return this;
  }

  checkValidity() {
    return this.#internals.checkValidity();
  }

  @on.invalid("*", prevent)
  [invalidated]() {
    this.dispatchEvent(new CustomEvent("invalidated"));
    return this;
  }

  @disconnected
  [removed]() {
    this.#controller.abort();
    this.dispatchEvent(new CustomEvent("removed"));
    return this;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  @formReset
  @joinCut(setValidity)
  reset() {
    this.#value = "";
    this.shadowRoot.querySelector("input").value = "";
    this.#internals.states.delete("invalid");
    this.dispatchEvent(new CustomEvent("reseted"));
    return this;
  }

  @formAssociated
  [setFormValue](form) {
    form.addEventListener(
      "formdata",
      (event) => event.formData.set(this.name, this.value),
      { signal: this.#controller.signal },
    );
    return this;
  }

  @didPaint
  [setValidity]() {
    const { validationMessage, validity } =
      this.shadowRoot.querySelector("input") ?? {};
    this.#internals.setValidity(validity, validationMessage);
    return this;
  }

  @on.invalid("*", prevent)
  [setState]() {
    this.validity.valid
      ? this.#internals.states.delete("invalid")
      : this.#internals.states.add("invalid");
    return this;
  }
}

export default TextField;
