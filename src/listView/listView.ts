import { define } from "@bake-js/-o-id";
import { paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import Template from "../dataView/template";
import component from "./component";

@define("ego-list-view")
@paint(component)
class ListView extends Echo(HTMLElement) {
  #content;
  #template = Template.from(this);

  get content() {
    return (this.#content ??= "");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @repaint
  clear() {
    this.#content = "";
    return this;
  }

  @repaint
  render(data) {
    this.#content = []
      .concat(data)
      .map((item) => this.#template.bind(item))
      .join("");
    return this;
  }
}

export default ListView;
