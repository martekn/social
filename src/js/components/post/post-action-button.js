import htmlUtilities from "../../helper/html-utilities/index.js";

/**
 * Represents Post action button
 * @class
 */
export class PostActionButton extends HTMLElement {
  /**
   * Create a new PostActionButton instance.
   * @constructor
   * @param {String} text - Text to be added to the button.
   * @param {String} iconClasses - Classes to be added to the button, e.g., 'bi bi-x'.
   * @param {String} type - Specifies whether it's a link or a button ('link' or 'button').
   * @param {String} [href] - The link attribute (required if type is 'link').
   * @param {String|Number} buttonId - The ID to be added to the button.
   * @param {String|Number} postId - The ID of the post to which the action button will be added.
   */
  constructor(text, iconClasses, type, href, buttonId, postId) {
    super();

    this.text = text ?? "";
    this.iconClasses = iconClasses ?? "";
    this.type = type ?? "button";
    this.href = href ?? "#";
    this.buttonId = `${buttonId}-${postId}`;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let action;
    const actionClasses =
      "p-1 hover:bg-light-400 w-full flex hover:text-dark-500 align-middle gap-2 justify-center rounded-md transition-all duration-200 ease-in-out";

    if (this.type === "link") {
      action = htmlUtilities.createHTML("a", actionClasses, null, {
        href: this.href,
        id: this.buttonId,
      });
    } else {
      action = htmlUtilities.createHTML("button", actionClasses, null, {
        id: this.buttonId,
      });
    }
    const icon = htmlUtilities.createHTML("i", this.iconClasses);
    const buttonText = htmlUtilities.createHTML(
      "span",
      "sr-only sm:not-sr-only",
      this.text,
    );

    action.append(...[icon, buttonText]);

    this.classList.add("w-full");
    this.append(action);
  }
}

customElements.define("post-action-button", PostActionButton);
