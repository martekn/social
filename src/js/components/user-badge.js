import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents a `UserBadge` class that creates a user badge component displaying the user's image and username as a link.
 * @class
 */
export class UserBadge extends HTMLElement {
  /**
   * Create a new `UserBadge` instance.
   * @constructor
   * @param {Object} userData - Data about the user.
   * @param {string} userData.avatar - The URL of the user's avatar image.
   * @param {string} userData.name - The username of the user.
   */
  constructor({ avatar, name }) {
    super();
    this.avatar =
      avatar ||
      this.getAttribute("image-url") ||
      "/assets/images/avatar-placeholder.jpg";
    this.name = name ?? this.getAttribute("name") ?? "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute("data-badge", this.name);
    const username = htmlUtilities.createHTML(
      "a",
      "flex items-center link link-secondary gap-2 py-1",
      null,
      {
        href: `/profile/?u=${this.name}`,
      },
    );

    const avatar = htmlUtilities.createHTML(
      "img",
      "aspect-square w-11 bg-light-400 rounded-full object-cover",
      null,
      {
        src: this.avatar,
        alt: this.name,
        onerror:
          "this.onerror=null;this.src='/assets/images/avatar-placeholder.jpg';",
      },
    );

    const name = htmlUtilities.createHTML("span", null, this.name);

    username.append(...[avatar, name]);
    this.append(username);
  }
}

customElements.define("user-badge", UserBadge);
