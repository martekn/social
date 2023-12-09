import { createPost } from "../helper/api/postRequests/create-post.js";
import { updatePost } from "../helper/api/putRequests/update-post.js";
import { getFormData } from "../helper/get-form-data.js";
import htmlUtilities from "../helper/html-utilities/index.js";
import { renderToast } from "../helper/render-toast.js";
import { DialogAlert } from "./alerts/dialog-alert.js";
import { InputGroup } from "./input-group.js";
import { SocialPost } from "./post/social-post.js";
import { AppLoader } from "./app-loader.js";
import Modal from "../helper/modal/index.js";

/**
 * Represents a `PostModal` class that adds a modal for either creating or editing an existing post.
 * The type of operation (create or edit) depends on whether a postId is provided in the configuration.
 * @class
 */
export class PostModal extends HTMLElement {
  /**
   * Create a new `PostModal` instance.
   * @constructor
   * @param {Object} [post] - The post configuration object (optional). If not provided, a default object is used for creating a new post.
   * @param {string} post.id - The ID of the post.
   * @param {string} post.title - The title of the post.
   * @param {string} post.media - The URL of the media (image or video) associated with the post.
   * @param {Array} post.tags - An array of tags for the post.
   * @param {string} post.body - The body text of the post.
   */
  constructor(post = { id: "", title: "", media: "", tags: [], body: "" }) {
    super();
    this.isEdit = Boolean(post.id);
    this.postId = post.id || "";
    this.heading = this.isEdit ? "Edit post" : "Create post";
    this.buttonText = this.isEdit ? "Save" : "Post";
    this.postTitle = post.title;
    this.media = post.media;
    this.tags = post.tags.join(" ");
    this.body = post.body;
    this.dialogId = this.isEdit ? "modal_post-edit" : "modal_post-creation";
    this.action = this.isEdit ? "" : "";
    this.method = this.isEdit ? "PUT" : "POST";
  }

  connectedCallback() {
    this.render();
    const cancelButton = this.querySelector(`#${this.dialogId}-cancel`);
    const form = this.querySelector("form");
    const modal = this.querySelector(`#${this.dialogId}`);

    this.addEventListener("click", (e) => {
      if (e.target == modal) {
        if (this.isEdit) {
          Modal.remove(this);
        } else {
          Modal.close(modal);
          const previousAlert = this.querySelector("dialog-alert");
          if (previousAlert) {
            previousAlert.remove();
          }
        }
      }
    });

    if (this.isEdit) {
      form.addEventListener("submit", this.postUpdateHandler.bind(this));
    } else {
      form.addEventListener("submit", this.postCreationHandler.bind(this));
    }

    cancelButton.addEventListener("click", (e) => {
      if (this.isEdit) {
        Modal.remove(this);
      } else {
        Modal.close(modal);
        const previousAlert = this.querySelector("dialog-alert");
        if (previousAlert) {
          previousAlert.remove();
        }
      }
    });
  }

  /**
   * Handles the submission of an update post form.
   *
   * @param {SubmitEvent} e - The form submission event.
   */
  async postUpdateHandler(e) {
    e.preventDefault();
    const loader = new AppLoader(true);
    const button = this.querySelector(`#${this.dialogId}-send`);
    button.prepend(loader);
    const formData = getFormData(e);

    try {
      const response = await updatePost(this.postId, formData);
      const post = document.querySelector(`#post-${this.postId}`);
      post.updateContent(
        response.updated,
        response.title,
        response.media,
        response.tags,
        response.body,
      );

      e.target.reset();
      Modal.close(this.querySelector(`#${this.dialogId}`));
      renderToast("Success: Post has been edited", "post-edited", "success");
      const toast = document.querySelector("#post-edited p");
      const link = htmlUtilities.createHTML(
        "a",
        "link underline hover:text-dark-500 font-medium px-1 transition-all",
        "view",
        {
          href: `/post/?id=${response.id}`,
        },
      );
      toast.append(link);
    } catch (error) {
      console.log(error);
      const errorMessage = new DialogAlert(error, "edit-error", "error");
      const heading = this.querySelector("h1");
      e.target.insertBefore(errorMessage, heading.nextSibling);
    } finally {
      loader.remove();
    }
  }

  /**
   * Handles the submission of a create post form.
   *
   * @param {SubmitEvent} e - The form submission event.
   */
  async postCreationHandler(e) {
    e.preventDefault();
    const loader = new AppLoader(true);
    const button = this.querySelector(`#${this.dialogId}-send`);
    button.prepend(loader);
    const formData = getFormData(e);

    try {
      const response = await createPost(formData);
      Modal.close(this.querySelector(`#${this.dialogId}`));

      renderToast("Success: Post was created", "post-created", "success");
      const toast = document.querySelector("#post-created p");
      const link = htmlUtilities.createHTML(
        "a",
        "link underline hover:text-dark-500 font-medium px-1 transition-all",
        "view",
        {
          href: `/post/?id=${response.id}`,
        },
      );

      toast.append(link);

      const list = document.querySelector("#posts-list");
      const path = window.location.pathname;
      const query = new URLSearchParams(window.location.search)?.get("u");
      const username = response.author.name;
      const alert = document.querySelector("ul dialog-alert");

      if (list && path !== "/search/") {
        if (query && query !== username && path === "/profile/") {
          return;
        }

        if (alert) {
          alert.remove();
        }

        response.author.following = [];
        const post = new SocialPost(response, response.author);
        const li = htmlUtilities.createHTML("li");
        li.append(post);
        list.prepend(li);

        post
          .querySelector("article")
          .classList.add("border-2", "border-primary-200");
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
      const previousAlert = this.querySelector("dialog-alert");
      if (previousAlert) {
        previousAlert.remove();
      }
      const errorMessage = new DialogAlert(error, "create-error", "error");
      const heading = this.querySelector("h1");
      e.target.insertBefore(errorMessage, heading.nextSibling);
    } finally {
      loader.remove();
    }
  }

  render() {
    const dialog = htmlUtilities.createHTML("dialog", null, null, {
      id: this.dialogId,
    });

    const container = htmlUtilities.createHTML("div", "p-10", null, {
      id: `${this.dialogId}_container`,
    });
    dialog.append(container);

    const form = htmlUtilities.createHTML("form", "grid gap-6", null, {
      action: this.action,
      method: this.method,
    });
    container.append(form);

    const heading = htmlUtilities.createHTML("h1", null, this.heading);

    const titleInput = new InputGroup(
      "Title",
      { for: "title" },
      {
        id: "title",
        type: "text",
        value: this.postTitle,
        placeholder: "Post title",
        name: "title",
        title: "Title is required",
        required: "true",
      },
    );
    const mediaInput = new InputGroup(
      "URL to video or image",
      { for: "media" },
      {
        id: "media",
        type: "url",
        name: "media",
        placeholder: "https://example.com/",
        value: this.media,
        title:
          "The link must be a fully formed URL that links to a live and publicly accessible image",
      },
    );
    const tagsInput = new InputGroup(
      "Tags",
      { for: "tags" },
      {
        id: "tags",
        type: "text",
        name: "tags",
        value: this.tags,
        placeholder:
          "Separate tags with a space, tags cant contain hashtags(#)",
      },
    );

    const bodyContainer = htmlUtilities.createHTML("div", "space-y-2");
    const bodyLabel = htmlUtilities.createHTML("label", null, "Body text", {
      for: "body",
    });
    const bodyTextarea = htmlUtilities.createHTML(
      "textarea",
      "min-h-[250px]",
      null,
      { id: "body", name: "body", placeholder: "Body text" },
    );
    bodyTextarea.textContent = this.body;

    bodyContainer.append(bodyLabel, bodyTextarea);

    const actionContainer = htmlUtilities.createHTML(
      "div",
      "flex justify-end gap-4 pt-3",
    );

    const cancelAction = htmlUtilities.createHTML(
      "button",
      "link link-primary",
      "Cancel",
      { id: `${this.dialogId}-cancel`, type: "button" },
    );
    const sendAction = htmlUtilities.createHTML(
      "button",
      "button button-primary flex gap-2",
      this.buttonText,
      { id: `${this.dialogId}-send`, type: "submit" },
    );
    actionContainer.append(...[cancelAction, sendAction]);

    form.append(
      ...[
        heading,
        titleInput,
        mediaInput,
        tagsInput,
        bodyContainer,
        actionContainer,
      ],
    );

    this.append(dialog);
  }
}

customElements.define("post-modal", PostModal);
