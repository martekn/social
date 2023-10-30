import htmlUtilities from "../../helper/html-utilities/index.js";
import { debounce } from "../../helper/debounce.js";
import { postComment } from "../../helper/api/postRequests/post-comment.js";
import { getFormData } from "../../helper/get-form-data.js";
import { PostComment } from "./post-comment.js";
import { stringToBoolean } from "../../helper/string-to-boolean.js";
import { renderToast } from "../../helper/render-toast.js";
import { AppLoader } from "../app-loader.js";

/**
 * Represents a comment form for a post, allowing users to write comments.
 * @class
 */
export class PostCommentForm extends HTMLElement {
  /**
   * Create a new PostCommentForm instance.
   * @constructor
   * @param {String} replyToId - The id of the comment the form will reply to.
   * @param {String} postId - The ID of the post to which the comment form is associated.
   * @param {Object} loggedInUser - Information about the logged-in user.
   * @param {String} loggedInUser.name - The name of the logged-in user.
   * @param {String} loggedInUser.avatar - The image of the logged-in user (avatar).
   */
  constructor(replyToId, postId, loggedInUser) {
    super();
    this.replyToId = replyToId === "0" ? null : replyToId;
    this.postId = postId;
    this.id = `${replyToId}-${this.postId}`;
    this.formId = `comment-form-${this.id}`;
    this.name = loggedInUser.name;
    this.avatar =
      loggedInUser.avatar || "/assets/images/avatar-placeholder.jpg";
    this.article = document.querySelector(`#post-${this.postId}`);
  }

  connectedCallback() {
    this.render();
    const textarea = this.querySelector("textarea");
    this.resizeTextareaHandler = debounce((e) => {
      this.resizeTextarea(textarea);
    }, 250);
    textarea.used = false;

    textarea.addEventListener("input", (e) => {
      this.resizeTextarea(textarea);
      if (!textarea.used) {
        window.addEventListener("resize", this.resizeTextareaHandler);
        textarea.used = true;
      }
    });
  }

  createComment = async (e) => {
    e.preventDefault();
    const loader = new AppLoader(true);
    const button = this.querySelector(`button`);
    button.prepend(loader);
    try {
      const body = getFormData(e);
      if (this.replyToId) {
        body.replyToId = Number(this.replyToId);
      }

      const response = await postComment(body, this.postId);
      window.removeEventListener("resize", this.resizeTextareaHandler);

      const comment = new PostComment(
        response,
        response.replyToId === null,
        this.postId,
        { name: this.name, avatar: this.avatar },
      );

      const rootParentId = response.replyToId;
      const li = htmlUtilities.createHTML("li", null, null, {
        "data-parent": rootParentId,
        id: `comment-li-${response.id}`,
      });
      li.append(comment);

      if (response.replyToId) {
        const isReplyingToRootComment = stringToBoolean(
          this.article
            .querySelector(`#comment-li-${response.replyToId}`)
            .getAttribute("data-root"),
        );
        let list = "";
        if (isReplyingToRootComment) {
          list = this.article.querySelector(
            `#comment-${response.replyToId} ul`,
          );
        } else {
          list = this.article
            .querySelector(`#comment-${response.replyToId}`)
            .closest("ul");
        }
        list.append(li);
      } else {
        li.setAttribute("data-root", "true");
        this.article.querySelector("#comments-list").prepend(li);

        this.querySelector("form").reset();
        this.querySelector("textarea").style.height = "2.75rem";
      }

      if (this.id !== `comment-form-0-${this.postId}`) {
        this.remove();
      }
    } catch (error) {
      console.log(error);
      renderToast(error, "comment-error", "error");
    } finally {
      loader.remove();
    }
  };

  /**
   * Automatically resizes a textarea element to fit its content.
   * @param {HTMLTextAreaElement} textarea - The textarea element to be resized.
   */
  resizeTextarea(textarea) {
    textarea.style.height = "auto";
    const height = textarea.scrollHeight + 2;
    textarea.style.height = height + "px";
  }

  render() {
    this.id = this.formId;
    this.classList.add("comment-form");
    const form = htmlUtilities.createHTML("form", "flex gap-2 mb-4", null);
    form.addEventListener("submit", this.createComment);

    const userAvatar = htmlUtilities.createHTML(
      "img",
      "h-11 w-11 flex-none bg-light-400 rounded-full hidden sm:block object-cover",
      null,
      {
        src: this.avatar,
        alt: this.name,
        onerror:
          "this.onerror=null;this.src='/assets/images/avatar-placeholder.jpg';",
      },
    );

    const formContent = htmlUtilities.createHTML("div", "w-full");

    const label = htmlUtilities.createHTML(
      "label",
      "sr-only",
      "Write a comment",
      { for: this.replyToId },
    );

    const textarea = htmlUtilities.createHTML(
      "textarea",
      "peer resize-none p-2 h-11",
      null,
      {
        name: "body",
        id: this.replyToId,
        placeholder: "Write a comment",
      },
    );

    const button = htmlUtilities.createHTML(
      "button",
      "button button-primary flex gap-2 mt-2 peer-placeholder-shown:hidden",
      "Post",
    );

    formContent.append(...[label, textarea, button]);

    form.append(...[userAvatar, formContent]);

    this.append(form);
  }
}

customElements.define("post-comment-form", PostCommentForm);
