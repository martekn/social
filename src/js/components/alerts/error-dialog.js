import htmlUtilities from "../../helper/html-utilities/index.js";

/**
 * Represents an `ErrorDialog` class that creates an error box with a specified error message.
 * @class
 */
export class ErrorDialog extends HTMLElement {
  /**
   * Create a new `ErrorDialog` instance.
   * @constructor
   * @param {String} message - The error message to be displayed in the error element.
   * @param {String|Number} errorId - The ID to be added to the error element.
   */
  constructor(message, errorId) {
    super();
    this.message = message;
    this.errorId = errorId;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const error = htmlUtilities.createHTML(
      "div",
      "mt-5 items-center animate-shake animate-once animate-duration-200 animate-ease-in-out rounded-md bg-red-50 p-4 text-sm font-medium text-red-800 flex",
      null,
      { id: this.errorId },
    );

    const icon = htmlUtilities.createHTML(
      "i",
      "bi bi-exclamation-circle mr-2",
      null,
      { "aria-hidden": "true" },
    );
    const text = htmlUtilities.createHTML("p", null, this.message);

    error.append(...[icon, text]);

    this.append(error);
  }
}

customElements.define("error-dialog", ErrorDialog);
