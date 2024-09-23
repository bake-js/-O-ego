import { connected, define, disconnected } from "@bake-js/-o-id";
import { paint } from "@bake-js/-o-id/dom";
import Echo from "@bake-js/-o-id/echo";
import relay from "@bake-js/-o-id/relay";
import component from "./component";
import { removed, setState, syncAttribute } from "./interfaces";
import style from "./style";
import Validator from "./validator";

@define("o-type-validator")
@paint(component, style)
class TypeValidator extends Echo(Validator) {
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @disconnected
  [removed]() {
    this.parentElement.removeAttribute("type");
    return this;
  }

  @connected
  [syncAttribute]() {
    if (this.isConnected) {
      this.disabled
        ? this.parentElement.removeAttribute("type")
        : this.parentElement.setAttribute("type", this.value);
    }
    return this;
  }

  @relay.changed()
  @relay.invalidated()
  @relay.retarget()
  [setState]() {
    this.parentElement.validity.typeMismatch
      ? this.#internals.states.add("invalid")
      : this.#internals.states.delete("invalid");
    return this;
  }
}

export default TypeValidator;
