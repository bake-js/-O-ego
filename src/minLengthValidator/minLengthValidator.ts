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

@define("o-minlength-validator")
@paint(component, style)
class MinLengthValidator extends Echo(Validator) {
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("minlength");
    return this;
  }

  @connected
  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("minlength")
        : this.parentElement.setAttribute("minlength", this.value);
    }
    return this;
  }

  @relay.changed()
  @relay.invalidated()
  @relay.mined()
  [setState]() {
    this.parentElement.validity.tooShort
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default MinLengthValidator;
