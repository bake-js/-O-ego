import { attributeChanged, define } from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on, { formData, prevent } from "@bake-js/-o-id/event";
import booleanAttribute from "../booleanAttribute.js";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import component from "./component";
import { reseted, setDisplay, submitted, template } from "./interfaces";
import style from "./style";
import Template from "./template";

@define("ego-form")
@paint(component, style)
class Form extends Echo(HTMLElement) {
  #hidden;
  #template = Template.from(this);

  get hidden() {
    return (this.#hidden ??= false);
  }

  @attributeChanged("hidden", booleanAttribute)
  @dispatchEvent("hiddened")
  @joinCut(setDisplay)
  set hidden(value) {
    this.#hidden = value;
  }

  get textContent() {
    return this.#template.content;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  reset() {
    const init = { bubbles: true, cancelable: true };
    const event = new Event("reset", init);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.reset("form")
  [reseted]() {
    const init = { bubbles: true, cancelable: true };
    const event = new CustomEvent("reseted", init);
    this.dispatchEvent(event);
    return this;
  }

  [setDisplay]() {
    this.hidden
      ? this.style.setProperty("display", "none")
      : this.style.setProperty("display", "block");
    return this;
  }

  submit() {
    const init = { bubbles: true, cancelable: true };
    const event = new Event("submit", init);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.submit("form", prevent, formData)
  [submitted](data) {
    const init = { bubbles: true, cancelable: true, detail: data };
    const event = new CustomEvent("submitted", init);
    this.dispatchEvent(event);
    return this;
  }
}

export default Form;
