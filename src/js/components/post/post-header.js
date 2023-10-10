import htmlUtilities from "../../helper/html-utilities/index.js";
import { getTimeSince } from "../../helper/get-time-since.js";

export class PostHeader extends HTMLElement {
  constructor(created, updated, name, avatar) {
    super();
    this.created = created;
    this.updated = updated;
    this.name = name;
    this.avatar = avatar;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const time = getTimeSince(this.created);
    const isFollowing = true;
    const isEdited = !this.created === this.updated;

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

    if (!isFollowing) {
      const follow = htmlUtilities.createHTML(
        "button",
        "before:w-1 before:rounded-full before:h-1 p-0 gap-3 align-middle flex before:block before:bg-dark-300 before:self-center link link-primary",
        "Follow",
      );
      userDetails.append(follow);
    }

    const timeDetails = htmlUtilities.createHTML(
      "div",
      "flex gap-3 text-dark-400 -mt-0.5 text-sm font-light font-accent",
    );
    const timeSince = htmlUtilities.createHTML("div", null, time);
    timeDetails.append(timeSince);

    if (isEdited) {
      const edited = htmlUtilities.createHTML(
        "div",
        "before:w-0.5 before:rounded-full before:h-0.5 gap-3 align-middle flex before:block before:bg-dark-300 before:self-center",
        "Edited",
      );
      timeDetails.append(edited);
    }

    headerDetails.append(...[userDetails, timeDetails]);

    header.append(...[imgWrapper, headerDetails]);

    this.append(header);
  }
}

customElements.define("post-header", PostHeader);
