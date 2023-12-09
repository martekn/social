import htmlUtilities from "../../helper/html-utilities/index.js";
import { getTimeSince } from "../../helper/get-time-since.js";
import { PostDropdown } from "./post-dropdown.js";
import { followUnfollowHandler } from "../../helper/follow-unfollow-handler.js";

/**
 * Represents the header component of a post, displaying the post's author information, creation and update dates, and options like the follow button or a dropdown menu.
 * @class
 */
export class PostHeader extends HTMLElement {
  /**
   * Create a new PostHeader instance.
   * @constructor
   * @param {String|Number} id - The ID of the post.
   * @param {String|Date} created - The date and time when the post was created. Accepts a string in ISO 8601 format or a Date object.
   * @param {String|Date} updated - The date and time when the post was last updated. Accepts a string in ISO 8601 format or a Date object.
   * @param {String} name - The name of the post's author.
   * @param {String} avatar - The avatar (image) of the post's author.
   * @param {String} title - The title of the post.
   * @param {String} media - The URL to the media (image) associated with the post.
   * @param {String[]} tags - An array of tags associated with the post.
   * @param {String} body - The body text of the post.
   * @param {Object} loggedInUser - Information about the logged-in user.
   * @param {String} loggedInUser.name - The name of the logged-in user.
   * @param {String} loggedInUser.avatar - The image of the logged-in user (avatar).
   * @param {String[]} loggedInUser.following - An array of user IDs that the logged-in user follows.
   */
  constructor(
    id,
    created,
    updated,
    name,
    avatar,
    title,
    media,
    tags,
    body,
    loggedInUser,
  ) {
    super();
    this.id = id;
    this.created = created;
    this.updated = updated;
    this.name = name;
    this.avatar = avatar;
    this.postTitle = title;
    this.media = media;
    this.tags = tags;
    this.body = body;
    this.loggedInUser;
    this.isEdited = this.created !== this.updated;
    this.isFollowing = loggedInUser.following.some(
      (user) => user.name === this.name,
    );
    this.isLoggedInUser = loggedInUser.name === this.name;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const header = htmlUtilities.createHTML(
      "header",
      "flex gap-2 align-middle",
    );

    // Avatar
    const imgWrapper = htmlUtilities.createHTML(
      "a",
      "w-11 h-11 my-auto",
      null,
      { href: `/profile/?u=${this.name}` },
    );

    const img = htmlUtilities.createHTML(
      "img",
      "object-cover bg-light-400 rounded-full w-full h-full",
      null,
      {
        src: this?.avatar,
        alt: this.name,
        onerror:
          "this.onerror=null;this.src='/assets/images/avatar-placeholder.jpg';",
      },
    );
    const imgSrOnly = htmlUtilities.createHTML("span", "sr-only", this.name);
    imgWrapper.append(...[img, imgSrOnly]);

    // Details
    const headerDetails = htmlUtilities.createHTML("div");
    const userDetails = htmlUtilities.createHTML("div", "flex gap-3");
    const username = htmlUtilities.createHTML(
      "a",
      "link link-secondary p-0",
      this.name,
      { href: `/profile/?u=${this.name}` },
    );
    userDetails.append(username);

    if (!this.isLoggedInUser) {
      const follow = htmlUtilities.createHTML(
        "button",
        "before:w-1 before:rounded-full data-[following='true']:hidden before:h-1 p-0 gap-3 align-middle flex before:block before:bg-dark-300 before:self-center link link-primary",
        "Follow",
        {
          "data-user": this.name,
          "data-following": this.isFollowing.toString(),
        },
      );
      userDetails.append(follow);

      follow.addEventListener("click", followUnfollowHandler);
    }

    const timeDetails = htmlUtilities.createHTML(
      "div",
      "flex gap-2 text-dark-400 -mt-0.5 text-sm font-light font-accent",
    );
    const timeSince = htmlUtilities.createHTML(
      "div",
      null,
      getTimeSince(this.created),
    );

    timeDetails.append(timeSince);

    if (this.isEdited) {
      const edited = htmlUtilities.createHTML(
        "div",
        "before:w-0.5 before:rounded-full before:h-0.5 gap-2 align-middle flex before:block before:bg-dark-300 before:self-center",
        "Edited",
      );
      timeDetails.append(edited);
    }

    headerDetails.append(...[userDetails, timeDetails]);

    header.append(...[imgWrapper, headerDetails]);

    if (this.isLoggedInUser) {
      const dropdown = new PostDropdown(
        this.id,
        this.postTitle,
        this.media,
        this.tags,
        this.body,
      );

      header.append(dropdown);
    }

    this.append(header);
  }
}

customElements.define("post-header", PostHeader);
