import {
  attributeChanged,
  connected,
  define,
  disconnected,
  formAssociated,
  formReset,
} from "@bake-js/-o-id";
import { didPaint, paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on, { prevent, value } from "@bake-js/-o-id/event";
import booleanAttribute from "../booleanAttribute";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import component from "./component";
import Input from "./input";
import {
  attached,
  changed,
  invalidated,
  removed,
  setFormValue,
  setState,
  setValidity,
} from "./interfaces";
import Label from "./label";
import style from "./style";

@define("o-text-field")
@paint(component, style)
class TextField extends Echo(HTMLElement) {
  #controller;
  #input;
  #internals;
  #label;

  get form() {
    return this.#internals.form;
  }

  get id() {
    return this.#input.id;
  }

  @attributeChanged("id")
  @dispatchEvent("reidentified")
  set id(value) {
    this.#label.for = value;
    this.#input.id = value;
  }

  get inputMode() {
    return this.#input.inputMode;
  }

  @attributeChanged("inputmode")
  @dispatchEvent("remoded")
  set inputMode(value) {
    this.#input.inputMode = value;
  }

  get label() {
    return this.#label.innerText;
  }

  @attributeChanged("label")
  @dispatchEvent("relabelled")
  set label(value) {
    this.#label.innerText = value;
  }

  get max() {
    return (this.#input.max ??= "");
  }

  @attributeChanged("max")
  @dispatchEvent("maximised")
  set max(value) {
    this.#input.max = value;
  }

  get maxLength() {
    return (this.#input.maxlength ??= "");
  }

  @attributeChanged("maxlength")
  @dispatchEvent("maxed")
  set maxLength(value) {
    this.#input.maxlength = value;
  }

  get min() {
    return (this.#input.min ??= "");
  }

  @attributeChanged("min")
  @dispatchEvent("minimised")
  set min(value) {
    this.#input.min = value;
  }

  get minLength() {
    return (this.#input.minlength ??= "");
  }

  @attributeChanged("minlength")
  @dispatchEvent("mined")
  set minLength(value) {
    this.#input.minlength = value;
  }

  get name() {
    return (this.#input.name ??= "");
  }

  @attributeChanged("name")
  @dispatchEvent("renamed")
  set name(value) {
    this.#input.name = value;
  }

  get readonly() {
    return this.#input.readonly;
  }

  @attributeChanged("readonly", booleanAttribute)
  @dispatchEvent("readonlyed")
  set readonly(value) {
    this.#input.readonly = value;
  }

  get required() {
    return this.#input.required;
  }

  @attributeChanged("required", booleanAttribute)
  @dispatchEvent("requireded")
  @joinCut(setState)
  @joinCut(setValidity)
  set required(value) {
    this.#input.required = value;
  }

  get type() {
    return this.#input.type;
  }

  @attributeChanged("type")
  @dispatchEvent("retarget")
  set type(value) {
    this.#input.type = value;
  }

  get validationMessage() {
    return this.#internals.validationMessage;
  }

  get validity() {
    return this.#internals.validity;
  }

  get value() {
    return this.#input.value;
  }

  @attributeChanged("value")
  @dispatchEvent("changed")
  @joinCut(setState)
  @joinCut(setValidity)
  set value(value) {
    this.#input.value = value;
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
    this.#input = Input.from(this);
    this.#label = Label.from(this);
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
    this.#input.value = "";
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
