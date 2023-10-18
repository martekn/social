import { deletePost } from "../../helper/api/deleteRequests/delete-post.js";
import htmlUtilities from "../../helper/html-utilities/index.js";
import { ErrorDialog } from "../error/error-dialog.js";
import { SuccessAlert } from "../error/success-alert.js";

/**
 * Represents a modal dialog that asks the user for confirmation when deleting a post.
 * @class
 */
export class PostDeleteModal extends HTMLElement {
  /**
   * Create a new PostDeleteModal instance.
   * @constructor
   * @param {String|Number} postId - The ID of the post that the user intends to delete.
   */
  constructor(postId) {
    super();
    this.postId = postId;
  }

  connectedCallback() {
    this.render();
  }

  deletePostHandler = async () => {
    try {
      const response = await deletePost(this.postId);

      const success = new SuccessAlert("Post was deleted", "delete-success");
      document.body.append(success);
      document.querySelector(`#post-${this.postId}`).remove();
      this.remove();
    } catch (error) {
      console.log(error);
      const errorMessage = new ErrorDialog(
        error,
        `delete-modal-${this.postId}_error`,
      );

      container.prepend(errorMessage);
      container.classList.add("pt-5");
    }
  };

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

    deleteButton.addEventListener("click", this.deletePostHandler);

    actionContainer.append(...[cancelButton, deleteButton]);
    container.append(...[heading, actionContainer]);
    deleteModal.append(container);

    this.append(deleteModal);
  }
}

customElements.define("post-delete-modal", PostDeleteModal);
