import { connected, define, disconnected } from "@bake-js/-o-id";
import { didPaint, paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on, { formData, prevent } from "@bake-js/-o-id/event";
import component from "./component";
import { attached, removed, reseted, submitted } from "./interfaces";
import style from "./style";

@define("o-form")
@paint(component, style)
class Form extends Echo(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @connected
  [attached]() {
    this.dispatchEvent(new CustomEvent("attached"));
    return this;
  }

  @disconnected
  [removed]() {
    this.dispatchEvent(new CustomEvent("removed"));
    return this;
  }

  reset() {
    const options = { bubbles: true, cancelable: true, composed: true };
    const event = new Event("reset", options);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.reset("form")
  [reseted]() {
    this.dispatchEvent(new CustomEvent("reseted"));
    return this;
  }

  submit() {
    const options = { bubbles: true, cancelable: true, composed: true };
    const event = new Event("submit", options);
    this.shadowRoot.querySelector("form").dispatchEvent(event);
    return this;
  }

  @on.submit("form", prevent, formData)
  [submitted](data) {
    this.dispatchEvent(new CustomEvent("submitted", { detail: data }));
    return this;
  }
}

export default Form;
