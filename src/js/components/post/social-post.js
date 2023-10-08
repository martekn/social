import htmlUtilities from "../../helper/html-utilities/index.js";
import { getTimeSince } from "../../helper/get-time-since.js";
import { TagItem } from "../tag-item.js";
import { PostActionButton } from "./post-action-button.js";

export class SocialPost extends HTMLElement {
  constructor({
    id,
    title,
    body,
    tags,
    media,
    created,
    updated,
    author,
    reactions,
    comments,
    _count,
  }) {
    super();

    this.id = id ?? "";
    this.title = title ?? "";
    this.body = body ?? "";
    this.tags = tags ?? [];
    this.media = media ?? "";
    this.created = created ?? "";
    this.updated = updated ?? "";
    this.author = author ?? {};
    this.reactions = reactions ?? [];
    this.comments = comments ?? [];
    this.count = _count ?? {};
  }

  connectedCallback() {
    this.render();
  }

  createHeader() {
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
      { href: `/profile/?u=${this.author.name}` },
    );

    const img = htmlUtilities.createHTML(
      "img",
      "object-cover rounded-full w-full h-full",
      null,
      {
        src: this.author?.avatar ?? "/assets/images/avatar-placeholder.jpg",
        alt: this.author.name,
      },
    );
    const imgSrOnly = htmlUtilities.createHTML(
      "span",
      "sr-only",
      this.author.name,
    );
    imgWrapper.append(...[img, imgSrOnly]);

    // Details
    const headerDetails = htmlUtilities.createHTML("div");
    const userDetails = htmlUtilities.createHTML("div", "flex gap-3");
    const username = htmlUtilities.createHTML(
      "a",
      "link link-secondary p-0",
      this.author.name,
      { href: `/profile/?u=${this.author.name}` },
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

    return header;
  }

  createMain() {
    const main = htmlUtilities.createHTML("main", "space-y-2");

    if (this.media) {
      const postImage = htmlUtilities.createHTML(
        "img",
        "rounded-md mb-4",
        null,
        {
          src: this.media,
          alt: "",
        },
      );
      main.append(postImage);
    }

    if (this.title) {
      const postTitle = htmlUtilities.createHTML("h2", null, this.title);
      main.append(postTitle);
    }

    if (this.body) {
      const postBody = htmlUtilities.createHTML(
        "p",
        "text-dark-400",
        this.body,
      );
      main.append(postBody);
    }

    return main;
  }

  createFooter() {
    const footer = htmlUtilities.createHTML("footer", "space-y-2");
    const footerDetails = htmlUtilities.createHTML(
      "div",
      "flex flex-col sm:justify-between sm:flex-row",
    );

    const tagList = htmlUtilities.createHTML("ul", "flex gap-2");
    if (this.tags.length > 0) {
      for (const tag of this.tags) {
        const li = htmlUtilities.createHTML("li");
        const tagElem = new TagItem(tag, "primary");

        li.append(tagElem);
        tagList.append(li);
      }
    }

    const reactionDetails = htmlUtilities.createHTML(
      "div",
      "space-x-5 text-sm flex text-dark-400 font-accent",
    );

    if (this.count.reactions > 0) {
      const wrapper = htmlUtilities.createHTML("div", "space-x-1");
      const heartCounter = htmlUtilities.createHTML(
        "span",
        "font-medium",
        this.count.reactions,
      );
      const heartText = htmlUtilities.createHTML("span", null, "hearts");
      wrapper.append(...[heartCounter, heartText]);

      reactionDetails.append(wrapper);
    }

    if (this.count.comments > 0) {
      const wrapper = htmlUtilities.createHTML(
        "button",
        "space-x-1 hover:text-dark-500 hover:border-b hover:border-dark-300 pb-[1px] hover:pb-0",
      );
      const commentCounter = htmlUtilities.createHTML(
        "span",
        "font-medium",
        this.count.comments,
      );
      const commentText = htmlUtilities.createHTML("span", null, "comments");
      wrapper.append(...[commentCounter, commentText]);

      reactionDetails.append(wrapper);
    }

    footerDetails.append(...[tagList, reactionDetails]);

    const actions = htmlUtilities.createHTML(
      "div",
      "flex justify-evenly text-dark-400 border-t pt-1 font-medium border-light-500",
    );

    const reactionButton = new PostActionButton(
      "Heart",
      "bi bi-heart",
      "button",
    );
    const commentButton = new PostActionButton(
      "Comment",
      "bi bi-chat-square",
      "button",
    );
    const viewButton = new PostActionButton(
      "View",
      "bi bi-box-arrow-up-right",
      "link",
      `/post/?id=${this.id}`,
    );

    actions.append(...[reactionButton, commentButton, viewButton]);

    footer.append(...[footerDetails, actions]);
    return footer;
  }

  render() {
    const article = htmlUtilities.createHTML(
      "article",
      "rounded-md bg-light-200 space-y-4 px-6 pt-6 pb-1 shadow-sm",
    );

    const header = this.createHeader();
    const main = this.createMain();

    const footer = this.createFooter();

    article.append(...[header, main, footer]);
    this.append(article);
  }
}

customElements.define("social-post", SocialPost);
