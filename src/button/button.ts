import { attributeChanged, define } from "@bake-js/-o-id";
import { paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on from "@bake-js/-o-id/event";
import booleanAttribute from "../booleanAttribute";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import component from "./component";
import { dispatchFormAction, setDisplay, setState } from "./interfaces";
import style from "./style";

@define("ego-button")
@paint(component, style)
class Button extends Echo(HTMLElement) {
  #content;
  #disabled;
  #hidden;
  #internals;
  #size;
  #type;
  #value;

  get disabled() {
    return this.#disabled;
  }

  @attributeChanged("disabled", booleanAttribute)
  @dispatchEvent("disabledChanged")
  @joinCut(setState)
  set readonly(value) {
    this.#disabled = value;
  }

  get hidden() {
    return (this.#hidden ??= false);
  }

  @attributeChanged("hidden", booleanAttribute)
  @dispatchEvent("hiddenChanged")
  @joinCut(setDisplay)
  set hidden(value) {
    this.#hidden = value;
  }

  get size() {
    return (this.#size ??= "lg");
  }

  @attributeChanged("size")
  @dispatchEvent("sizeChanged")
  @repaint
  set size(value) {
    this.#size = value;
  }

  get type() {
    return (this.#type ??= "");
  }

  @attributeChanged("type")
  @dispatchEvent("typeChanged")
  set type(value) {
    this.#type = value;
  }

  get value() {
    return this.#value;
  }

  @attributeChanged("value")
  @dispatchEvent("valueChanged")
  set value(value) {
    this.#value = value;
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  @on.click(":host :not(:disabled) *")
  @joinCut(dispatchFormAction)
  click() {
    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("clicked", init);
    this.dispatchEvent(event);
    return this;
  }

  [dispatchFormAction]() {
    switch (this.type) {
      case "submit":
        this.#internals.form?.requestSubmit();
        break;
      case "reset":
        this.#internals.form?.reset();
        break;
    }
    return this;
  }

  [setDisplay]() {
    this.hidden
      ? this.style.setProperty("display", "none")
      : this.style.removeProperty("display");
    return this;
  }

  [setState]() {
    this.disabled
      ? this.#internals.states.add("disabled")
      : this.#internals.states.delete("disabled");
  }
}

export default Button;
