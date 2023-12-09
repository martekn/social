import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents an `InputGroup` class that creates a container for a label, input, and error message for a specific input field.
 * @class
 */
export class InputGroup extends HTMLElement {
  /**
   * Create a new `InputGroup` instance.
   * @constructor
   * @param {String} inputLabel - The label text for the input field.
   * @param {Object} labelAttributes - Attributes to be added to the label element (e.g., { for: "inputId" }).
   * @param {Object} inputAttributes - Attributes to be added to the input element (e.g., { id: "inputId" }).
   */
  constructor(inputLabel, labelAttributes, inputAttributes) {
    super();
    this.inputLabel = inputLabel;
    this.labelAttributes = labelAttributes;
    this.inputAttributes = inputAttributes;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const group = htmlUtilities.createHTML("div", "space-y-2");
    const label = htmlUtilities.createHTML(
      "label",
      null,
      this.inputLabel,
      this.labelAttributes,
    );
    const input = htmlUtilities.createHTML(
      "input",
      "peer",
      null,
      this.inputAttributes,
    );

    group.append(...[label, input]);

    this.append(group);
  }
}

customElements.define("input-group", InputGroup);
