import { attributeChanged, define } from "@bake-js/-o-id";
import { paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import booleanAttribute from "../booleanAttribute";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import component from "./component";
import { setDisplay } from "./interfaces";
import style from "./style";

@define("ego-button")
@paint(component, style)
class Button extends Echo(HTMLElement) {
  #content;
  #disabled;
  #hidden;

  get content() {
    return (this.#content ??= "");
  }

  @attributeChanged("content")
  @dispatchEvent("contented")
  @repaint
  set content(value) {
    this.#content = value;
  }

  get disabled() {
    return this.#disabled;
  }

  @attributeChanged("disabled", booleanAttribute)
  @dispatchEvent("redisabed")
  @repaint
  set readonly(value) {
    this.#disabled = value;
  }

  get hidden() {
    return (this.#hidden ??= false);
  }

  @attributeChanged("hidden", booleanAttribute)
  @dispatchEvent("hiddened")
  @joinCut(setDisplay)
  set hidden(value) {
    this.#hidden = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  [setDisplay]() {
    this.hidden
      ? this.style.setProperty("display", "none")
      : this.style.removeProperty("display");
    return this;
  }
}

export default Button;
