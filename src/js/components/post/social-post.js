import htmlUtilities from "../../helper/html-utilities/index.js";
import { PostHeader } from "./post-header.js";
import { PostMain } from "./post-main.js";
import { PostFooter } from "./post-footer.js";
import "./post-comment-form.js";
import { PostCommentSection } from "./post-comment-section.js";
import { PostComment } from "./post-comment.js";

export class SocialPost extends HTMLElement {
  constructor(
    {
      id,
      title,
      body,
      tags,
      media,
      created,
      updated,
      author: { name, avatar },
      reactions,
      comments,
      _count,
    },
    profile,
  ) {
    super();

    this.id = id ?? "";
    this.title = title ?? "";
    this.body = body ?? "";
    this.tags = tags ?? [];
    this.media = media ?? "";
    this.created = created ?? "";
    this.updated = updated ?? "";
    this.name = name ?? "";
    this.avatar = avatar || "/assets/images/avatar-placeholder.jpg";
    this.reactions = reactions ?? [];
    this.comments = comments ?? [];
    this.count = _count ?? { reactions: 0, comments: 0 };
    this.loggedInUser = {
      name: profile.name,
      avatar: profile.avatar,
      following: profile.following,
    };
  }

  connectedCallback() {
    this.render();
    this.displayComments();

    const commentAction = this.querySelector(`#action-comment-${this.id}`);
    const commentButton = this.querySelector(`#comment-counter-${this.id}`);

    if (commentButton) {
      commentButton.addEventListener("click", this.showComments);
    }

    commentAction.addEventListener("click", this.showCommentWithFocus);
  }

  showCommentWithFocus = () => {
    this.showComments();
    const input = this.querySelector(`#comment-form-0-${this.id} textarea`);
    input.focus();
  };

  showComments = (e) => {
    const actionBar = this.querySelector("footer [data-comments-visible]");
    actionBar.setAttribute("data-comments-visible", "true");
    this.querySelector("#comment-section").classList.remove("hidden");
  };

  findRootComment(currentComment) {
    if (!currentComment.replyToId) {
      return currentComment.id;
    }

    const parentComment = this.comments.find(
      ({ id }) => id === currentComment.replyToId,
    );

    if (!parentComment) {
      return currentComment.id;
    }

    return this.findRootComment(parentComment);
  }

  displayComments() {
    const list = this.querySelector("#comments-list");
    const rootComments = this.comments.filter(({ replyToId }) => !replyToId);
    const nestedComments = this.comments.filter(({ replyToId }) => replyToId);

    for (const comment of rootComments) {
      const li = htmlUtilities.createHTML("li", null, null, {
        id: `comment-li-${comment.id}`,
      });
      const postComment = new PostComment(
        comment,
        true,
        this.id,
        this.loggedInUser,
      );
      li.append(postComment);
      list.append(li);
    }

    for (const comment of nestedComments) {
      const list = this.querySelector(
        `#comment-${this.findRootComment(comment)} ul`,
      );
      const li = htmlUtilities.createHTML("li", null, null, {
        id: `comment-li-${comment.id}`,
      });
      const postComment = new PostComment(
        comment,
        false,
        this.id,
        this.loggedInUser,
      );
      li.append(postComment);
      list.append(li);
    }
  }

  render() {
    const article = htmlUtilities.createHTML(
      "article",
      "rounded-md bg-light-200 grid gap-4 px-6 pt-6 pb-1 shadow-sm",
    );

    const header = new PostHeader(
      this.id,
      this.created,
      this.updated,
      this.name,
      this.avatar,
      this.title,
      this.media,
      this.tags,
      this.body,
      this.loggedInUser,
    );
    const main = new PostMain(this.title, this.body, this.media);

    const footer = new PostFooter(this.id, this.tags, this.count);

    const commentSection = new PostCommentSection(
      this.name,
      this.avatar,
      this.id,
      this.loggedInUser,
    );

    article.append(...[header, main, footer, commentSection]);
    this.append(article);
  }
}

customElements.define("social-post", SocialPost);
