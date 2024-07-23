import trait from "../trait";

function paint(component, style) {
  return (target) => {
    const connectedCallback =
      target.prototype.connectedCallback ?? (() => undefined);

    Reflect.defineProperty(target.prototype, trait.paint, {
      async value() {
        await this[trait.willPaint]?.();
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            (this.shadowRoot ?? document).adoptedStyleSheets = style
              ? [style(this)]
              : [];
            (this.shadowRoot ?? this).innerHTML = component(this);
            resolve();
          });
        });
        await this[trait.didPaint]?.();
      },
      writable: true,
    });

    Reflect.defineProperty(target.prototype, "connectedCallback", {
      async value() {
        await Reflect.apply(connectedCallback, this, arguments);
        await this[trait.paint]();
        return this;
      },
      writable: true,
    });
  };
}

export default paint;
