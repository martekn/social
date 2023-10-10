import htmlUtilities from "../../helper/html-utilities/index.js";
import { debounce } from "../../helper/debounce.js";

export class PostCommentForm extends HTMLElement {
  // static get observedAttributes() {
  //   return ["profile-loaded"];
  // }
  constructor(inputName, inputId, postId, loggedInUser) {
    super();
    this.user = { name: "", avatar: "" };
    this.inputName = inputName;
    this.inputId = inputId || "0";
    this.id = `${inputId}-${postId}`;
    this.formId = `comment-form-${this.id}`;
    this.inputId = this.id;
    this.loggedInUser = loggedInUser;
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
      "h-11 w-11 flex-none rounded-full hidden sm:block object-cover",
      null,
      { src: this.loggedInUser.avatar, alt: this.loggedInUser.name },
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
