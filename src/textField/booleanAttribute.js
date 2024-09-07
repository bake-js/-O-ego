const booleanAttribute = (value) => !/(false|0|no)/i.test(value);

export default booleanAttribute;
