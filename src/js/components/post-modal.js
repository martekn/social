import htmlUtilities from "../helper/html-utilities/index.js";
import { InputGroup } from "./input-group.js";

export class PostModal extends HTMLElement {
  constructor(post = { id: "", title: "", media: "", tags: [], body: "" }) {
    super();
    this.postId = post.id || "";
    this.heading = this.postId ? "Edit post" : "Create post";
    this.buttonText = this.postId ? "Save" : "Post";
    this.title = post.title;
    this.media = post.media;
    this.tags = post.tags.join(" ");
    this.body = post.body;
    this.dialogId = this.postId ? "modal_post-edit" : "modal_post-creation";
    this.action = this.postId ? "" : "";
    this.method = this.postId ? "PUT" : "POST";
  }

  connectedCallback() {
    this.render();
    const cancelButton = this.querySelector(`#${this.dialogId}-cancel`);
    const form = this.querySelector("form");
    const modal = this.querySelector(`#${this.dialogId}`);

    this.addEventListener("click", (e) => {
      if (e.target == modal) {
        if (this.postId) {
          this.remove();
        } else {
          modal.close();
        }
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    cancelButton.addEventListener("click", (e) => {
      if (this.postId) {
        this.remove();
      } else {
        modal.close();
      }
    });
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
      "text",
      "title",
      this.title,
      "Post title",
      "title",
      "Title is required",
    );
    const mediaInput = new InputGroup(
      "URL to video or image",
      "url",
      "media",
      this.media,
      "https://example.com/",
      "media",
      "The link must be a fully formed URL that links to a live and publicly accessible image ",
    );
    const tagsInput = new InputGroup(
      "Tags",
      "text",
      "tags",
      this.tags,
      "Separate tags with a space, tags cant contain hashtags(#)",
      "tags",
    );

    const bodyContainer = htmlUtilities.createHTML("div", "space-y-2");
    const bodyLabel = htmlUtilities.createHTML("label", null, "Body text", {
      for: "body",
    });
    const bodyTextarea = htmlUtilities.createHTML(
      "textarea",
      "min-h-[250px]",
      this.body,
      { id: "body", name: "body", placeholder: "Body text" },
    );
    bodyContainer.append(bodyLabel, bodyTextarea);

    const actionContainer = htmlUtilities.createHTML(
      "div",
      "flex justify-end gap-4 pt-3",
    );
    const cancelAction = htmlUtilities.createHTML(
      "button",
      "font-accent font-medium text-primary-400",
      "Cancel",
      { id: `${this.dialogId}-cancel` },
    );
    const sendAction = htmlUtilities.createHTML(
      "button",
      "rounded-md bg-primary-400 px-6 py-2 font-accent font-medium text-light-200",
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
