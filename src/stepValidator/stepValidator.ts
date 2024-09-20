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

@define("o-step-validator")
@paint(component, style)
class StepValidator extends Echo(Validator) {
  #internals;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("step");
    return this;
  }

  @connected
  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("step")
        : this.parentElement.setAttribute("step", this.value);
    }
    return this;
  }

  @relay.changed()
  @relay.invalidated()
  @relay.stepped()
  [setState]() {
    this.parentElement.validity.stepMismatch
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default StepValidator;
