import { define } from "@bake-js/-o-id";
import { paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import component from "./component";
import Template from "./template";

@define("ego-data-view")
@paint(component)
class DataView extends Echo(HTMLElement) {
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
    this.#content = this.#template.bind(data);
    return this;
  }
}

export default DataView;
