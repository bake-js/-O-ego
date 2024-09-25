import { define } from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on, { formData, prevent } from "@bake-js/-o-id/event";
import component from "./component";
import { reseted, submitted } from "./interfaces";
import style from "./style";

@define("ego-form")
@paint(component, style)
class Form extends Echo(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @on.reset("form")
  [reseted]() {
    this.dispatchEvent(new CustomEvent("reseted"));
    return this;
  }

  @on.submit("form", prevent, formData)
  [submitted](data) {
    this.dispatchEvent(new CustomEvent("submitted", { detail: data }));
    return this;
  }
}

export default Form;
