const ifPainted = (_target, _propertyKey, descriptor) => {
  const substituted = descriptor.value ?? (() => undefined);

  Object.assign(descriptor, {
    async value(...args) {
      return this.isPainted
        ? Reflect.apply(substituted, this, args)
        : undefined;
    },
  });
};

export default ifPainted;
