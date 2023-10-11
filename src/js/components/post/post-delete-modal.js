import htmlUtilities from "../../helper/html-utilities/index.js";

export class PostDeleteModal extends HTMLElement {
  constructor(postId) {
    super();
    this.postId = postId;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const deleteModal = htmlUtilities.createHTML("dialog", "max-w-lg", null, {
      id: `delete-modal-${this.postId}`,
    });
    const container = htmlUtilities.createHTML(
      "div",
      "space-y-6 p-10 text-center",
      null,
      { id: `delete-modal-${this.postId}_container` },
    );

    const heading = htmlUtilities.createHTML(
      "h1",
      "null",
      "Are you sure you want to delete the post?",
    );
    const actionContainer = htmlUtilities.createHTML(
      "div",
      "flex justify-center gap-10",
    );

    const cancelButton = htmlUtilities.createHTML(
      "button",
      "w-49 link link-secondary block",
      "Cancel",
      { id: `delete-modal-${this.postId}_cancel` },
    );

    cancelButton.addEventListener("click", (e) => {
      this.remove();
    });

    const deleteButton = htmlUtilities.createHTML(
      "button",
      "button w-49 bg-red-900 text-light-200 hover:bg-red-800",
      "Delete",
      { id: `delete-modal-${this.postId}_delete` },
    );

    actionContainer.append(...[cancelButton, deleteButton]);
    container.append(...[heading, actionContainer]);
    deleteModal.append(container);

    this.append(deleteModal);
  }
}

customElements.define("post-delete-modal", PostDeleteModal);
