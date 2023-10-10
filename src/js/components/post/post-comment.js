import htmlUtilities from "../../helper/html-utilities/index.js";
import { getTimeSince } from "../../helper/get-time-since.js";
import { PostCommentForm } from "./post-comment-form.js";

export class PostComment extends HTMLElement {
  constructor(
    { id, author: { name, avatar }, created, body, replyToId },
    isRootComment,
    postId,
    loggedInUser,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.avatar = avatar || "/assets/images/avatar-placeholder.jpg";
    this.created = created;
    this.body = body;
    this.replyToId = replyToId;
    this.timeSince = getTimeSince(this.created);
    this.isRootComment = isRootComment;
    this.postId = postId;
    this.loggedInUser = loggedInUser;
  }

  connectedCallback() {
    this.render();

    const replyButton = this.querySelector("button");
    replyButton.addEventListener("click", (e) => {
      const container = this.querySelector("#comment-container");
      const footer = container.querySelector("footer");
      console.log(container);
      let form = container.querySelector(
        `#comment-form-${this.id}-${this.postId}`,
      );

      if (!form) {
        form = new PostCommentForm(
          `comment-reply-${this.id}`,
          this.id,
          this.postId,
          this.loggedInUser,
        );

        footer.insertAdjacentElement("afterend", form);
      }
      const textarea = form.querySelector("textarea");
      textarea.focus();
      textarea.value = `@${this.name} `;
    });
  }

  render() {
    const comment = htmlUtilities.createHTML("article", "flex gap-2", null, {
      id: `comment-${this.id}`,
    });

    const avatarWrapper = htmlUtilities.createHTML(
      "a",
      "h-11 w-11 flex-none",
      null,
      { href: `/profile/?u=${this.name}` },
    );
    const avatar = htmlUtilities.createHTML(
      "img",
      "h-full w-full rounded-full object-cover",
      null,
      { src: this.avatar, alt: this.name },
    );
    const avatarText = htmlUtilities.createHTML("span", "sr-only", this.name);
    avatarWrapper.append(...[avatar, avatarText]);

    const commentContainer = htmlUtilities.createHTML("div", "w-full", null, {
      id: "comment-container",
    });

    const commentContent = htmlUtilities.createHTML(
      "div",
      "space-y-2 rounded-md bg-light-400 p-3",
    );
    const commentHeader = htmlUtilities.createHTML(
      "header",
      "flex flex-wrap gap-2",
    );
    const username = htmlUtilities.createHTML(
      "a",
      "link link-secondary p-0",
      this.name,
      { href: `/profile/?u=${this.name}` },
    );
    const timeStamp = htmlUtilities.createHTML(
      "div",
      "flex gap-2 p-0 align-middle text-dark-300 before:block before:h-0.5 before:w-0.5 before:self-center before:rounded-full before:bg-dark-300",
      this.timeSince,
    );

    commentHeader.append(...[username, timeStamp]);

    const main = htmlUtilities.createHTML("main");
    const commentBody = htmlUtilities.createHTML(
      "p",
      "text-dark-300",
      this.body,
    );
    main.append(commentBody);

    commentContent.append(...[commentHeader, main]);

    const footer = htmlUtilities.createHTML("footer");
    const replyButton = htmlUtilities.createHTML(
      "button",
      "link link-secondary text-sm",
      "Reply",
    );

    footer.append(replyButton);

    commentContainer.append(...[commentContent, footer]);

    if (this.isRootComment) {
      const replyContainer = htmlUtilities.createHTML("section");
      const replyHeading = htmlUtilities.createHTML(
        "h4",
        "sr-only",
        `Replies to ${this.name}`,
      );
      const replyList = htmlUtilities.createHTML("ul");
      replyContainer.append(...[replyHeading, replyList]);
      commentContainer.append(replyContainer);
    }

    comment.append(...[avatarWrapper, commentContainer]);
    this.append(comment);
  }
}

customElements.define("post-comment", PostComment);
