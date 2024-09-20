const dispatchEvent = (eventName) => (_target, _propertyKeyKey, descriptor) => {
  const originalSet = descriptor.set ?? (() => undefined);

  Object.assign(descriptor, {
    async set(value) {
      await Reflect.apply(originalSet, this, [value]);

      if (this.isConnected) {
        this.dispatchEvent(
          new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: value,
          }),
        );
      }
    },
  });
};

export default dispatchEvent;
