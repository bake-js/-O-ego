import { define } from "@bake-js/-o-id";
import { paint, repaint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import component from "./component";

@define("ego-data-view")
@paint(component)
class DataView extends Echo(HTMLElement) {
  #content;

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
    const template = this.querySelector("template").innerHTML;
    const content = template.replace(/\{(.*?)\}/g, (_, path) => {
      if (path === "") return data;
      return new Function("data", `return data.${path}`)(data);
    });
    this.#content = content;
    return this;
  }
}

export default DataView;
