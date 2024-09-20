import { connected, define, disconnected } from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import relay from "@bake-js/-o-id/relay";
import Validator, {
  component,
  removed,
  setState,
  style,
  syncAttribute,
} from "../validator";

@define("o-maxlength-validator")
@paint(component, style)
class MaxLengthValidator extends Echo(Validator) {
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("maxlength");
    return this;
  }

  @connected
  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("maxlength")
        : this.parentElement.setAttribute("maxlength", this.value);
    }
    return this;
  }

  @relay.changed()
  @relay.invalidated()
  @relay.maxed()
  [setState]() {
    this.parentElement.validity.tooLong
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default MaxLengthValidator;
