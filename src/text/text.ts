import { attributeChanged, define } from "@bake-js/-o-id";
import { paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import on from "@bake-js/-o-id/event";
import booleanAttribute from "../booleanAttribute";
import dispatchEvent from "../dispatchEvent";
import joinCut from "../joinCut";
import component from "./component";
import { setDisplay } from "./interfaces";
import style from "./style";

@define("ego-text")
@paint(component, style)
class Text extends Echo(HTMLElement) {
  #display;
  #hidden;
  #size;
  #weight;

  get display() {
    return (this.#display ??= false);
  }

  @attributeChanged("display", booleanAttribute)
  @dispatchEvent("")
  @repaint
  set display(value) {
    this.#display = value;
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

  get size() {
    return this.display
      ? `display-${(this.#size ??= "sm")}`
      : (this.#size ??= "sm");
  }

  @attributeChanged("size")
  @dispatchEvent("sized")
  @repaint
  set size(value) {
    this.#size = value;
  }

  get weight() {
    return (this.#weight ??= "regular");
  }

  @attributeChanged("weight")
  @dispatchEvent("")
  @repaint
  set weight(value) {
    this.#weight = value;
  }

  static get formAssociated() {
    return true;
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

export default Text;
