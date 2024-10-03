class Template {
  #dataView;

  get #content() {
    return this.#dataView.querySelector("template")?.innerHTML ?? "";
  }

  constructor(dataView) {
    this.#dataView = dataView;
  }

  bind(data) {
    return this.#content.replace(/\{(.*?)\}/g, (_, path) => {
      if (path === "") return data;
      return new Function("data", `return data.${path}`)(data);
    });
  }

  static from(dataView) {
    return new Template(dataView);
  }
}

export default Template;
