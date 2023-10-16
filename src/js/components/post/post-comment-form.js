import htmlUtilities from "../../helper/html-utilities/index.js";
import { debounce } from "../../helper/debounce.js";

/**
 * Represents a comment form for a post, allowing users to write comments.
 * @class
 */
export class PostCommentForm extends HTMLElement {
  /**
   * Create a new PostCommentForm instance.
   * @constructor
   * @param {String} inputName - The value to be added to the name attribute of the input.
   * @param {String} inputId - The value to be added to the id attribute of the input.
   * @param {String} postId - The ID of the post to which the comment form is associated.
   * @param {Object} loggedInUser - Information about the logged-in user.
   * @param {String} loggedInUser.name - The name of the logged-in user.
   * @param {String} loggedInUser.avatar - The image of the logged-in user (avatar).
   */
  constructor(inputName, inputId, postId, loggedInUser) {
    super();
    this.inputName = inputName;
    this.inputId = inputId || "0";
    this.id = `${inputId}-${postId}`;
    this.formId = `comment-form-${this.id}`;
    this.inputId = this.id;
    this.name = loggedInUser.name;
    this.avatar =
      loggedInUser.avatar || "/assets/images/avatar-placeholder.jpg";
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

  postComment() {
    // If post request successful
    //   window.removeEventListener("resize", this.resizeTextareaHandler)
  }

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
      { for: this.inputId },
    );

    const textarea = htmlUtilities.createHTML(
      "textarea",
      "peer resize-none p-2 h-11",
      null,
      {
        name: this.inputName,
        id: this.inputId,
        placeholder: "Write a comment",
      },
    );

    const button = htmlUtilities.createHTML(
      "button",
      "button button-primary mt-2 peer-placeholder-shown:hidden",
      "Post",
    );

    formContent.append(...[label, textarea, button]);

    form.append(...[userAvatar, formContent]);

    this.append(form);
  }
}

customElements.define("post-comment-form", PostCommentForm);
