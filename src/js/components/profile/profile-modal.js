import htmlUtilities from "../../helper/html-utilities/index.js";
import { UserBadge } from "../user-badge.js";
import Modal from "../../helper/modal/index.js";

/**
 * Represents a `ProfileModal` class that displays a modal for listing users who are either followers or followed by the current user.
 * @class
 */
export class ProfileModal extends HTMLElement {
  /**
   * Create a new `ProfileModal` instance.
   * @constructor
   * @param {String} modalType - The type of the modal, which should be either "follower" or "following".
   * @param {String} title - The title of the modal.
   * @param {Object[]} users - An array of user objects, each with `name` and `avatar` properties.
   */
  constructor(modalType, title, users) {
    super();
    this.modalType = modalType;
    this.postTitle = title;
    this.users = users;
  }

  connectedCallback() {
    this.render();

    this.addEventListener("click", (e) => {
      const modal = this.querySelector(`#${this.modalType}-modal`);
      if (e.target == modal) {
        Modal.close(modal);
      }
    });
  }

  render() {
    const modal = htmlUtilities.createHTML(
      "dialog",
      "h-[90vh] max-h-[600px] max-w-md",
      null,
      {
        id: `${this.modalType}-modal`,
      },
    );
    const modalContainer = htmlUtilities.createHTML(
      "div",
      "flex flex-col h-full w-full overflow-hidden p-0",
      null,
      {
        id: `${this.modalType}-modal_container`,
      },
    );
    modal.append(modalContainer);

    const container = htmlUtilities.createHTML(
      "div",
      "flex items-center justify-between border-b border-light-450 px-6 py-2",
    );
    const heading = htmlUtilities.createHTML("h2", null, this.postTitle);

    const closeButton = htmlUtilities.createHTML(
      "button",
      "link link-secondary text-xl",
    );
    const buttonIcon = htmlUtilities.createHTML("i", "bi bi-x", null, {
      "aria-hidden": "true",
    });
    const buttonText = htmlUtilities.createHTML(
      "span",
      "sr-only",
      `Close ${this.postTitle} modal`,
    );

    closeButton.addEventListener("click", (e) => {
      Modal.close(document.querySelector(`#${this.modalType}-modal`));
    });

    closeButton.append(...[buttonIcon, buttonText]);
    container.append(...[heading, closeButton]);

    const list = htmlUtilities.createHTML(
      "ul",
      "scrollbar flex-1 overflow-y-auto px-6 space-y-1 py-4",
    );
    for (const user of this.users) {
      const li = htmlUtilities.createHTML("li");
      const userBadge = new UserBadge(user);
      li.append(userBadge);
      list.append(li);
    }
    modalContainer.append(...[container, list]);
    this.append(modal);
  }
}

customElements.define("profile-modal", ProfileModal);
