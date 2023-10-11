import htmlUtilities from "../helper/html-utilities/index.js";
import { ErrorMessage } from "./error/error-message.js";

export class InputGroup extends HTMLElement {
  constructor(
    inputLabel,
    inputType,
    inputId,
    inputValue,
    inputPlaceholder,
    inputName,
    errorMessage,
    isRequired = false,
  ) {
    super();
    this.inputLabel = inputLabel;
    this.inputType = inputType;
    this.inputId = inputId;
    this.inputValue = inputValue;
    this.inputPlaceholder = inputPlaceholder;
    this.inputName = inputName;
    this.errorMessage = errorMessage;
    this.isRequired = isRequired;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const group = htmlUtilities.createHTML("div", "space-y-2");
    const label = htmlUtilities.createHTML("label", null, this.inputLabel, {
      for: this.inputId,
    });
    const input = htmlUtilities.createHTML("input", null, null, {
      id: this.inputId,
      type: this.inputType,
      value: this.inputValue,
      placeholder: this.inputPlaceholder,
      name: this.inputName,
    });

    if (this.isRequired) {
      input.setAttribute("required", "true");
    }

    group.append(...[label, input]);
    if (this.errorMessage) {
      const error = new ErrorMessage(
        this.errorMessage,
        `${this.inputId}-error`,
      );
      group.append(error);
    }
    this.append(group);
  }
}

customElements.define("input-group", InputGroup);
