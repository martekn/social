import htmlUtilities from "../../helper/html-utilities/index.js";
import { PostHeader } from "./post-header.js";
import { PostMain } from "./post-main.js";
import { PostFooter } from "./post-footer.js";
import "./post-comment-form.js";
import { PostCommentSection } from "./post-comment-section.js";
import { PostComment } from "./post-comment.js";

/**
 * The `SocialPost` class represents the main post component that combines and integrates various subcomponents related to a post, such as the header, main content, footer and comments,
 * @class
 */
export class SocialPost extends HTMLElement {
  /**
   * Create a new SocialPost instance.
   * @constructor
   * @param {Object} postData - Data related to the post.
   * @param {String|Number} postData.id - The ID of the post.
   * @param {String} postData.title - The title of the post.
   * @param {String} postData.body - The body text of the post.
   * @param {String[]} postData.tags - An array of tags associated with the post.
   * @param {String} postData.media - The URL to the media content (image or video) associated with the post.
   * @param {Date} postData.created - The timestamp when the post was created (e.g., '2023-10-03T12:40:04.628Z').
   * @param {Date} postData.updated - The timestamp when the post was last updated (e.g., '2023-10-03T12:40:04.628Z').
   * @param {Object} postData.author - Information about the post's author.
   * @param {String} postData.author.name - The name of the post's author.
   * @param {String} postData.author.avatar - The image of the post's author (avatar).
   * @param {Object[]} postData.comments - An array of comment objects associated with the post.
   * @param {Object} postData._count - Metadata about reactions and comments for the post.
   * @param {Object} profile - Information about the logged-in user.
   * @param {String} profile.name - The name of the logged-in user.
   * @param {String} profile.avatar - The image of the logged-in user (avatar).
   * @param {Object[]} profile.following - An array of user objects that the logged-in user follows.
   */
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
      comments,
      _count,
      reactions,
    },
    profile,
  ) {
    super();
    this.postId = id ?? "";
    this.id = `post-${this.postId}`;
    this.title = title ?? "";
    this.body = body ?? "";
    this.tags = tags ?? [];
    this.media = media ?? "";
    this.created = created ?? "";
    this.updated = updated ?? "";
    this.name = name ?? "";
    this.avatar = avatar || "/assets/images/avatar-placeholder.jpg";
    this.comments = comments ?? [];
    this.commentCount = _count?.comments ?? 0;
    this.loggedInUser = profile;
    this.reactionCount = reactions.reduce(
      (totalReactions, currentReaction) =>
        totalReactions + currentReaction.count,
      0,
    );
  }

  connectedCallback() {
    this.render();
    this.displayComments();

    const commentAction = this.querySelector(`#action-comment-${this.postId}`);
    const commentButton = this.querySelector(`#comment-counter-${this.postId}`);

    if (commentButton) {
      commentButton.addEventListener("click", this.showComments);
    }

    commentAction.addEventListener("click", this.showCommentWithFocus);
  }

  showCommentWithFocus = () => {
    this.showComments();
    const input = this.querySelector(`#comment-form-0-${this.postId} textarea`);
    input.focus();
  };

  showComments = (e) => {
    const actionBar = this.querySelector("footer [data-comments-visible]");
    actionBar.setAttribute("data-comments-visible", "true");
    this.querySelector("#comment-section").classList.remove("hidden");
  };

  /**
   * Recursively finds the root comment (the initial comment to which a given comment is replying).
   *
   * @param {Object} currentComment - The comment for which the root comment is to be found.
   * @param {String} currentComment.id - The ID of the current comment.
   * @param {String} currentComment.replyToId - The ID of the comment to which the current comment is replying.
   * @returns {String} The ID of the root comment.
   */
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
        this.postId,
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
        this.postId,
        this.loggedInUser,
      );
      li.append(postComment);
      list.append(li);
    }
  }

  updateContent(updatedDate, title, media, tags, body) {
    const post = this.querySelector("article");
    post.innerHTML = "";

    const header = new PostHeader(
      this.postId,
      this.created,
      updatedDate,
      this.name,
      this.avatar,
      title,
      media,
      tags,
      body,
      this.loggedInUser,
    );

    const main = new PostMain(title, body, media);

    const footer = new PostFooter(
      this.postId,
      tags,
      this.commentCount,
      this.reactionCount,
    );

    const commentSection = new PostCommentSection(
      this.postId,
      this.loggedInUser,
    );

    post.append(...[header, main, footer, commentSection]);
  }

  render() {
    const article = htmlUtilities.createHTML(
      "article",
      "rounded-md bg-light-200 grid gap-4 px-6 pt-6 pb-1 shadow-sm",
    );

    const header = new PostHeader(
      this.postId,
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

    const footer = new PostFooter(
      this.postId,
      this.tags,
      this.commentCount,
      this.reactionCount,
    );

    const commentSection = new PostCommentSection(
      this.postId,
      this.loggedInUser,
    );

    article.append(...[header, main, footer, commentSection]);
    this.append(article);
  }
}

customElements.define("social-post", SocialPost);
