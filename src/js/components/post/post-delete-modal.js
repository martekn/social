import { deletePost } from "../../helper/api/deleteRequests/delete-post.js";
import htmlUtilities from "../../helper/html-utilities/index.js";
import { DialogAlert } from "../alerts/dialog-alert.js";
import { renderToast } from "../../helper/render-toast.js";
import Modal from "../../helper/modal/index.js";

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

    const modal = this.querySelector("dialog");
    this.addEventListener("click", (e) => {
      if (e.target == modal) {
        if (this.isEdit) {
          Modal.remove(this);
        } else {
          Modal.close(modal);
        }
      }
    });
  }

  deletePostHandler = async () => {
    try {
      const response = await deletePost(this.postId);

      renderToast(
        "Success: Post has been deleted",
        "delete-success",
        "success",
      );
      document.querySelector(`#post-${this.postId}`).remove();
      Modal.remove(this);
      if (window.location.pathname === "/post/") {
        const alert = new DialogAlert(
          "This post has been deleted",
          "deleted-post",
          "information",
        );
        document.querySelector("main").append(alert);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = new DialogAlert(
        error,
        `delete-modal-${this.postId}_error`,
        "error",
      );

      container.prepend(errorMessage);
      container.classList.add("pt-5");
    }
  };

  render() {
    const deleteModal = htmlUtilities.createHTML(
      "dialog",
      "max-w-lg container",
      null,
      {
        id: `delete-modal-${this.postId}`,
      },
    );
    const container = htmlUtilities.createHTML("div", null, null, {
      id: `delete-modal-${this.postId}_container`,
    });

    const textContainer = htmlUtilities.createHTML(
      "div",
      "p-10 text-center space-y-3",
    );
    const heading = htmlUtilities.createHTML(
      "h1",
      "null",
      "Are you sure you want to delete this post?",
    );

    const text = htmlUtilities.createHTML(
      "p",
      "text-dark-300",
      "Once you delete this post, it cannot be recovered. All associated comments and reactions will also be removed.",
    );
    textContainer.append(...[heading, text]);

    const actionContainer = htmlUtilities.createHTML(
      "div",
      "flex justify-evenly divide-x divide-light-450 border-t border-light-450",
    );
    const buttonClasses = "block w-full p-3 font-accent font-medium";
    const cancelButton = htmlUtilities.createHTML(
      "button",
      `${buttonClasses} hover:bg-light-400 hover:text-dark-500 text-dark-400`,
      "Cancel",
      { id: `delete-modal-${this.postId}_cancel` },
    );

    cancelButton.addEventListener("click", (e) => {
      Modal.remove(this);
    });

    const deleteButton = htmlUtilities.createHTML(
      "button",
      `${buttonClasses} text-red-800 hover:bg-red-50 w-full hover:text-red-900`,
      "Delete",
      { id: `delete-modal-${this.postId}_delete` },
    );

    deleteButton.addEventListener("click", this.deletePostHandler);

    actionContainer.append(...[cancelButton, deleteButton]);
    container.append(...[textContainer, actionContainer]);
    deleteModal.append(container);

    this.append(deleteModal);
  }
}

customElements.define("post-delete-modal", PostDeleteModal);
