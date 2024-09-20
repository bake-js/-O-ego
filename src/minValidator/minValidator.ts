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

@define("o-min-validator")
@paint(component, style)
class MinValidator extends Echo(Validator) {
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("min");
    return this;
  }

  @connected
  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("min")
        : this.parentElement.setAttribute("min", this.value);
    }
    return this;
  }

  @relay.changed()
  @relay.invalidated()
  @relay.minimised()
  [setState]() {
    this.parentElement.validity.rangeUnderflow
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default MinValidator;
