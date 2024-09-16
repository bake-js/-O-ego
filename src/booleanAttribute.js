const booleanAttribute = (value) => {
  if (value === "") return true;
  if (value === null) return false;
  return true;
};

export default booleanAttribute;
