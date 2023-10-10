import htmlUtilities from "../../helper/html-utilities/index.js";
import { PostCommentForm } from "./post-comment-form.js";

export class PostCommentSection extends HTMLElement {
  constructor(name, avatar, id, loggedInUser) {
    super();
    this.name = name;
    this.avatar = avatar;
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
