import htmlUtilities from "../../helper/html-utilities/index.js";

/**
 * A custom HTML element for displaying toast alerts.
 */
export class ToastAlert extends HTMLElement {
  /**
   * Creates a new ToastAlert instance.
   * @param {string} message - The message to display in the toast alert.
   * @param {string} toastId - The ID for the toast alert element.
   * @param {string} [toastType="information"] - The type of the toast alert (e.g., "information", "success", "error").
   */
  constructor(message, toastId, toastType = "information") {
    super();
    this.message = message;
    this.toastId = toastId;
    this.toastType = toastType;
    this.icon = "bi bi-info-square";
    this.classes = "border-dark-300 text-dark-300 bg-light-450";

    if (this.toastType === "success") {
      this.icon = "bi bi-check";
      this.classes = "border-green-800 text-green-800 bg-green-50";
    }

    if (this.toastType === "error") {
      this.icon = "bi bi-exclamation-circle";
      this.classes = "border-red-800 text-red-800 bg-red-50";
    }
  }

  connectedCallback() {
    this.render();

    setTimeout(() => {
      this.remove();
    }, 4000);
  }

  render() {
    const toast = htmlUtilities.createHTML(
      "div",
      `mt-5 items-start animate-fade-down animate-once animate-duration-[150ms] pointer-events-auto animate-ease-in mx-auto rounded-md p-4 text-sm font-medium flex z-50 w-full max-w-xl border ${this.classes}`,
      null,
      { id: this.toastId },
    );

    const icon = htmlUtilities.createHTML(
      "i",
      `text-lg mr-2 ${this.icon}`,
      null,
      {
        "aria-hidden": "true",
      },
    );
    const text = htmlUtilities.createHTML(
      "p",
      "self-center mr-4",
      this.message,
    );

    const close = htmlUtilities.createHTML("button", "ml-auto");
    close.addEventListener("click", (e) => {
      this.remove();
    });
    const closeText = htmlUtilities.createHTML(
      "span",
      "sr-only",
      "Close alert",
    );
    const closeIcon = htmlUtilities.createHTML("i", "bi bi-x text-lg");
    close.append(closeText, closeIcon);

    toast.append(...[icon, text, close]);

    this.append(toast);
  }
}

customElements.define("toast-alert", ToastAlert);
