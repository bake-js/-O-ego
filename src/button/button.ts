import { attributeChanged, define } from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import component from "./component";

@define("ego-button")
@paint(component)
class Button extends Echo(HTMLElement) {
  #content;

  get contetn() {
    return (this.#content ??= "");
  }

  @attributeChanged("content")
  set content(value) {
    this.#content = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Button;
