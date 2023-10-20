import { followUnfollowHandler } from "../helper/follow-unfollow-handler.js";
import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents a custom HTML element for displaying user search results.
 *
 * @class UserSearch
 */
export class UserSearch extends HTMLElement {
  /**
   * Create a new `UserSearch` instance.
   *
   * @constructor
   * @param {Object} userData - An object containing user data.
   * @param {string} userData.name - The user's name.
   * @param {string} userData.avatar - The user's avatar image URL.
   * @param {Object} userData._count - An object containing user count information (e.g., followers and following).
   * @param {Object} loggedInUser - An object representing the logged-in user.
   */
  constructor({ name, avatar, _count }, loggedInUser) {
    super();
    this.avatar =
      avatar ||
      this.getAttribute("image-url") ||
      "/assets/images/avatar-placeholder.jpg";
    this.name = name ?? this.getAttribute("name") ?? "";
    this.count = _count;

    this.isFollowing = loggedInUser.following.some(
      (user) => user.name === this.name,
    );
    this.isLoggedInUser = loggedInUser.name === this.name;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add(..."flex items-center gap-3 py-8".split(" "));
    const avatarLink = htmlUtilities.createHTML(
      "a",
      "aspect-square w-11",
      null,
      { href: `/profile/?u=${this.name}` },
    );
    const avatar = htmlUtilities.createHTML(
      "img",
      "aspect-square bg-light-400 rounded-full object-cover",
      null,
      {
        src: this.avatar,
        alt: this.name,
        onerror:
          "this.onerror=null;this.src='/assets/images/avatar-placeholder.jpg';",
      },
    );
    avatarLink.append(avatar);

    const container = htmlUtilities.createHTML(
      "div",
      "flex w-full justify-between",
    );
    const userDetails = htmlUtilities.createHTML("div");
    const username = htmlUtilities.createHTML(
      "a",
      "link link-secondary py-0 font-accent font-medium",
      this.name,
      { href: `/profile/?u=${this.name}` },
    );
    const userStats = htmlUtilities.createHTML(
      "div",
      "flex gap-2 font-accent text-sm text-dark-300",
    );
    const followers = htmlUtilities.createHTML(
      "span",
      null,
      `${this.count.followers} followers`,
    );
    const following = htmlUtilities.createHTML(
      "span",
      null,
      `${this.count.following} following`,
    );
    userStats.append(...[followers, following]);
    userDetails.append(...[username, userStats]);
    container.append(userDetails);

    if (!this.isLoggedInUser) {
      const button = htmlUtilities.createHTML(
        "button",
        "link link-primary data-[following='true']:hidden",
        "Follow",
        {
          id: `search-follow-${this.name}`,
          "data-user": this.name,
          "data-following": this.isFollowing.toString(),
        },
      );
      button.addEventListener("click", followUnfollowHandler);

      container.append(button);
    }
    this.append(...[avatarLink, container]);
  }
}

customElements.define("user-search", UserSearch);
