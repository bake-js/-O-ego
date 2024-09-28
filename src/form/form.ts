import { define } from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on, { formData, prevent } from "@bake-js/-o-id/event";
import component from "./component";
import { reseted, submitted, template } from "./interfaces";
import style from "./style";

@define("ego-form")
@paint(component, style)
class Form extends Echo(HTMLElement) {
  get content() {
    return this.querySelector("template").innerHTML;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  reset() {
    const config = { bubbles: true, cancelable: true };
    const event = new Event("reset", config);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.reset("form")
  [reseted]() {
    const config = { bubbles: true, cancelable: true };
    const event = new CustomEvent("reseted", config);
    this.dispatchEvent(event);
    return this;
  }

  submit() {
    const config = { bubbles: true, cancelable: true };
    const event = new Event("submit", config);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.submit("form", prevent, formData)
  [submitted](data) {
    const config = { bubbles: true, cancelable: true, detail: data };
    const event = new CustomEvent("submitted", config);
    this.dispatchEvent(event);
    return this;
  }
}

export default Form;
