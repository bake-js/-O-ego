const interpolation = (path, target) => {
  try {
    return new Function(
      "data",
      `return data${/(^\[|^ $)/.test(path) ? "" : "."}${path}`,
    )(target);
  } catch (_error) {
    return undefined;
  }
};

export default interpolation;
