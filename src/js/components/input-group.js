import htmlUtilities from "../helper/html-utilities/index.js";
import { ErrorMessage } from "./error/error-message.js";

/**
 * Represents an `InputGroup` class that creates a container for a label, input, and error message for a specific input field.
 * @class
 */
export class InputGroup extends HTMLElement {
  /**
   * Create a new `InputGroup` instance.
   * @constructor
   * @param {String} inputLabel - The label text for the input field.
   * @param {String} inputType - The value for the `type` attribute on the input element.
   * @param {String} inputId - The value for the `id` attribute on the input element.
   * @param {String} inputValue - The initial value for the input element.
   * @param {String} inputPlaceholder - The value for the `placeholder` attribute on the input element.
   * @param {String} inputName - The value for the `name` attribute on the input element.
   * @param {String} errorMessage - The message to be displayed as an error message.
   * @param {Boolean} [isRequired=false] - If `true`, the `required` attribute is added to the input element.
   */
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
