import htmlUtilities from "../../helper/html-utilities/index.js";
import { getTimeSince } from "../../helper/get-time-since.js";
import { PostDropdown } from "./post-dropdown.js";

export class PostHeader extends HTMLElement {
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
    this.title = title;
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
      "object-cover rounded-full w-full h-full",
      null,
      {
        src: this?.avatar,
        alt: this.name,
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

    if (!this.isFollowing && !this.isLoggedInUser) {
      const follow = htmlUtilities.createHTML(
        "button",
        "before:w-1 before:rounded-full before:h-1 p-0 gap-3 align-middle flex before:block before:bg-dark-300 before:self-center link link-primary",
        "Follow",
      );
      userDetails.append(follow);
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
        this.title,
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
