import htmlUtilities from "../../helper/html-utilities/index.js";

/**
 * Represents an `DialogAlert` class that creates an alert box with a specified message.
 * @class
 */
export class DialogAlert extends HTMLElement {
  /**
   * Create a new `DialogAlert` instance.
   * @constructor
   * @param {String} message - The message to be displayed in the alert element.
   * @param {String|Number} dialogId - The ID to be added to the alert element.
   * @param {String} [dialogType="information"] - The type of the dialog alert (e.g., "information", "success", "error") .
   */
  constructor(message, dialogId, dialogType = "information") {
    super();
    this.message = message;
    this.dialogId = dialogId;
    this.dialogType = dialogType;

    this.icon = "bi bi-info-square";
    this.classes = "border-dark-300 text-dark-300 bg-light-450";

    if (this.dialogType === "success") {
      this.icon = "bi bi-check";
      this.classes = "border-green-800 text-green-800 bg-green-50";
    }

    if (this.dialogType === "error") {
      this.icon = "bi bi-exclamation-circle";
      this.classes =
        "animate-shake animate-once animate-duration-200 animate-ease-in-out bg-red-100 border-red-800 text-red-800";
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const dialog = htmlUtilities.createHTML(
      "div",

      `flex text-sm font-medium mt-5 p-4 border items-start rounded-md ${this.classes}`,
      null,
      { id: this.dialogId },
    );

    const icon = htmlUtilities.createHTML("i", `mr-2 ${this.icon}`, null, {
      "aria-hidden": "true",
    });
    const text = htmlUtilities.createHTML("p", null, this.message);

    dialog.append(...[icon, text]);

    this.append(dialog);
  }
}

customElements.define("dialog-alert", DialogAlert);
