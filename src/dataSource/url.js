class Url {
  #value;

  get value() {
    return (this.#value ??= "");
  }

  set value(value) {
    this.#value = value;
  }

  bind(data) {
    return this.value.replace(/\{(.*?)\}/g, (_, path) => {
      if (path === "") return data;
      return new Function("data", `return data.${path}`)(data);
    });
  }
}

export default Url;
