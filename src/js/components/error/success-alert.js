import htmlUtilities from "../../helper/html-utilities/index.js";

export class SuccessAlert extends HTMLElement {
  constructor(successMessage, successId) {
    super();
    this.message = successMessage;
    this.successId = successId;
  }

  connectedCallback() {
    this.render();

    setTimeout(() => {
      this.remove();
    }, 3000);
  }

  render() {
    const success = htmlUtilities.createHTML(
      "div",
      "mt-5 items-center fixed animate-fade-down animate-once animate-duration-[150ms] animate-ease-in mx-auto left-0 right-0 top-10 rounded-md bg-green-50 p-4 text-sm font-medium text-green-800 flex z-50 w-fit border border-green-800",
      null,
      { id: this.successId },
    );

    const icon = htmlUtilities.createHTML(
      "i",
      "text-lg bi bi-check mr-2",
      null,
      {
        "aria-hidden": "true",
      },
    );
    const text = htmlUtilities.createHTML("p", null, this.message);

    success.append(...[icon, text]);

    this.append(success);
  }
}

customElements.define("success-alert", SuccessAlert);
