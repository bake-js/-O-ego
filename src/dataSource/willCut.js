const willCut = (method) => {
  return (_target, _propertyKey, descriptor) => {
    const type = descriptor.set ? "set" : "value";
    const substituted = descriptor[type] ?? (() => undefined);

    Object.assign(descriptor, {
      async [type](...args) {
        await this[method]?.(...args);
        await Reflect.apply(substituted, this, args);
        return this;
      },
    });
  };
};

export default willCut;
