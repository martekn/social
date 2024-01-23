import htmlUtilities from "../../helper/html-utilities/index.js";
import { getTimeSince } from "../../helper/get-time-since.js";
import { PostCommentForm } from "./post-comment-form.js";
import { stringToBoolean } from "../../helper/string-to-boolean.js";

/**
 * Represents a comment in a post's comment section.
 * @class
 */
export class PostComment extends HTMLElement {
  /**
   * Create a new PostComment instance.
   * @constructor
   * @param {String|Number} id - The ID of the comment.
   * @param {Object} author - Information about the comment author.
   * @param {String} author.name - The name of the comment author.
   * @param {String} author.avatar - The image of the comment author (avatar).
   * @param {Date} created - The timestamp when the comment was posted.
   * @param {String} body - The text content of the comment.
   * @param {String} replyToId - The ID of the comment to which this comment is a reply.
   * @param {boolean} isRootComment - Indicates if this comment is a root comment (direct reply to the post).
   * @param {String|Number} postId - The ID of the post to which the comment is associated.
   * @param {Object} loggedInUser - Information about the logged-in user.
   * @param {String} loggedInUser.name - The name of the logged-in user.
   * @param {String} loggedInUser.avatar - The image of the logged-in user (avatar).
   */
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
    this.article = document.querySelector(`#post-${this.postId}`);
  }

  connectedCallback() {
    this.render();

    const replyButton = this.querySelector("button");

    replyButton.addEventListener("click", (e) => {
      const container = this.querySelector("#comment-container");
      const footer = container.querySelector("footer");
      let form = container.querySelector(
        `#comment-form-${this.id}-${this.postId}`,
      );

      if (!form) {
        form = new PostCommentForm(
          this.id,
          this.postId,
          this.loggedInUser,
          this.replyToId,
        );
        footer.insertAdjacentElement("afterend", form);
      }

      const textarea = form.querySelector("textarea");

      if (this.replyToId) {
        const isReplyingToRootComment = stringToBoolean(
          this.article
            .querySelector(`#comment-li-${this.replyToId}`)
            .getAttribute("data-root"),
        );

        textarea.value = isReplyingToRootComment ? `@${this.name} ` : "";
      }
      textarea.focus();
    });
  }

  render() {
    const comment = htmlUtilities.createHTML("article", "flex gap-2", null, {
      id: `comment-${this.id}`,
    });

    const avatarWrapper = htmlUtilities.createHTML(
      "a",
      "h-8 xs:h-11 w-8 xs:w-11 flex-none",
      null,
      { href: `/profile/?u=${this.name}` },
    );
    const avatar = htmlUtilities.createHTML(
      "img",
      "h-full w-full bg-light-400 rounded-full object-cover",
      null,
      {
        src: this.avatar,
        alt: this.name,
        onerror:
          "this.onerror=null;this.src='/assets/images/avatar-placeholder.jpg';",
      },
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
