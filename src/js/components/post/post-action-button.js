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
    this.id = `post-action-${this.buttonId}`;
    this.append(action);
  }
}

customElements.define("post-action-button", PostActionButton);

/**
 * Represents Post action button used for post reactions
 * @class
 */
export class ReactionButton extends PostActionButton {
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
    super(text, iconClasses, type, href, buttonId, postId);
  }

  animateHeart() {
    const icon = this.querySelector("i");
    icon.classList.add("relative", "bi-heart-fill");
    icon.classList.remove("bi-heart");

    const reactionIcon = htmlUtilities.createHTML(
      "i",
      "bi-heart-fill text-primary-400 m-auto absolute inset-0 animate-jump animate-duration-500",
    );

    icon.append(reactionIcon);

    setTimeout(() => {
      icon.classList.add("bi-heart");
      icon.classList.remove("bi-heart-fill");
      reactionIcon.classList.remove("animate-jump");
      reactionIcon.classList.add(
        ..."animate-fade [animation-direction:reverse] animate-duration-300".split(
          " ",
        ),
      );
    }, 500);

    setTimeout(() => {
      reactionIcon.remove();
    }, 800);
  }
}

customElements.define("reaction-button", ReactionButton);
