import htmlUtilities from "../../helper/html-utilities/index.js";

export class ErrorMessage extends HTMLElement {
  constructor(message, errorId) {
    super();
    this.message = message;
    this.errorId = errorId;
  }

  connectedCallback() {
    this.render();
  }

  showError() {
    const error = this.querySelector(`#${this.errorId}`);
    error.setAttribute("data-error", "true");
  }

  render() {
    const error = htmlUtilities.createHTML(
      "p",
      "mt-2 hidden gap-1 text-sm text-red-800 data-[error='true']:flex",
      null,
      { id: this.errorId },
    );
    const icon = htmlUtilities.createHTML(
      "i",
      "bi bi-exclamation-circle",
      null,
      { "aria-hidden": "true" },
    );
    const message = htmlUtilities.createHTML("span", this.errorMessage);

    error.append(...[icon, message]);
    this.append(error);
  }
}

customElements.define("error-message", ErrorMessage);
