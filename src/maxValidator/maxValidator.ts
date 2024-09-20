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

@define("o-max-validator")
@paint(component, style)
class MaxValidator extends Echo(Validator) {
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("max");
    return this;
  }

  @connected
  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("max")
        : this.parentElement.setAttribute("max", this.value);
    }
    return this;
  }

  @relay.changed()
  @relay.invalidated()
  @relay.maximised()
  [setState]() {
    this.parentElement.validity.rangeOverflow
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default MaxValidator;
