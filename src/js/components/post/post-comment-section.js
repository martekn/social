import htmlUtilities from "../../helper/html-utilities/index.js";
import { PostCommentForm } from "./post-comment-form.js";

/**
 * Represents the comment section of a post, including a heading, initial CommentForm, and a comment list.
 * @class
 */
export class PostCommentSection extends HTMLElement {
  /**
   * Create a new PostCommentSection instance.
   * @constructor
   * @param {String} id - The ID of the post to which the comment section is associated.
   * @param {Object} loggedInUser - Information about the logged-in user.
   * @param {String} loggedInUser.name - The name of the logged-in user.
   * @param {String} loggedInUser.avatar - The image of the logged-in user (avatar).
   */
  constructor(id, loggedInUser) {
    super();

    this.postId = id;
    this.loggedInUser = loggedInUser;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const section = htmlUtilities.createHTML("section", "pb-4");

    this.classList.add("hidden");
    this.setAttribute("id", "comment-section");
    const heading = htmlUtilities.createHTML("h3", "sr-only", "Comments");

    const commentForm = new PostCommentForm(
      "comment-form",
      "0",
      this.postId,
      this.loggedInUser,
    );

    const commentList = htmlUtilities.createHTML("ul", "space-y-2", null, {
      id: "comments-list",
    });
    section.append(...[heading, commentForm, commentList]);

    this.append(section);
  }
}

customElements.define("post-comment-section", PostCommentSection);
