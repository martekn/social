import htmlUtilities from "../../helper/html-utilities/index.js";
import { stringToBoolean } from "../../helper/string-to-boolean.js";
import { handleFocusTrap } from "../../helper/handle-focus-trap.js";
import { PostModal } from "../post-modal.js";
import { PostDeleteModal } from "./post-delete-modal.js";
import Modal from "../../helper/modal/index.js";

/**
 * Represents an extra options dropdown for a post, typically containing options to delete or edit the post.
 * @class
 */
export class PostDropdown extends HTMLElement {
  /**
   * Create a new PostDropdown instance.
   * @constructor
   * @param {String|Number} postId - The ID of the post to which the dropdown is associated.
   * @param {String} title - The title of the post.
   * @param {String} media - The URL to the image associated with the post.
   * @param {String[]} tags - An array of tags associated with the post.
   * @param {String} body - The body text of the post.
   */
  constructor(postId, title, media, tags, body) {
    super();
    this.postId = postId;
    this.post = {
      id: this.postId,
      title: title,
      media: media,
      tags: tags,
      body: body,
    };
  }

  connectedCallback() {
    this.render();

    const dropdownButton = this.querySelector(
      `#dropdown-${this.postId}_button`,
    );

    dropdownButton.addEventListener("click", (e) => {
      let state = stringToBoolean(dropdownButton.getAttribute("aria-expanded"));
      state = !state;

      if (state) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    });
  }

  /**
   * Update the state of a dropdown component.
   *
   * @param {boolean} state - The new state of the dropdown (true for open, false for closed).
   */
  updateDropdownState = (state) => {
    const dropdownButton = this.querySelector(
      `#dropdown-${this.postId}_button`,
    );

    dropdownButton.setAttribute("aria-expanded", state);

    const list = this.querySelector(`#dropdown-${this.postId}_list`);
    list.setAttribute("aria-expanded", state);
    list.setAttribute("data-dropdown-open", state);
  };

  handleClickOutsideDropdown = (e) => {
    const elements = Array.from(this.querySelectorAll("*"));
    if (!elements.find((element) => element === e.target)) {
      this.closeDropdown();
    }
  };

  setDropdownFocus(e) {
    const dropdown = this.querySelector(`#dropdown-${this.postId}`);
    handleFocusTrap(dropdown, "button", this.closeDropdown, e);
  }

  openDropdown() {
    this.addEventListener("keydown", this.setDropdownFocus);
    window.addEventListener("click", this.handleClickOutsideDropdown);

    this.updateDropdownState(true);
  }

  closeDropdown = () => {
    this.removeEventListener("keydown", this.setDropdownFocus);
    window.removeEventListener("click", this.handleClickOutsideDropdown);

    this.updateDropdownState(false);
  };

  renderEditModal = () => {
    const main = document.querySelector("main");
    const modal = new PostModal(this.post);

    main.append(modal);
    Modal.open(modal.querySelector("dialog"));
    this.closeDropdown();
  };

  renderDeleteModal = () => {
    const main = document.querySelector("main");
    const modal = new PostDeleteModal(this.postId);
    main.append(modal);
    Modal.open(modal.querySelector("dialog"));
    this.closeDropdown();
  };

  render() {
    this.classList.add("ml-auto");

    const dropdown = htmlUtilities.createHTML("div", "relative", null, {
      id: `dropdown-${this.postId}`,
    });
    const dropdownButton = htmlUtilities.createHTML(
      "button",
      "aspect-square h-8 rounded-md text-dark-300 hover:bg-light-400 active:bg-light-450 transition-all",
      null,
      {
        id: `dropdown-${this.postId}_button`,
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "aria-controls": `dropdown-${this.postId}_list`,
      },
    );
    const dropdownButtonIcon = htmlUtilities.createHTML(
      "i",
      "bi bi-three-dots",
      null,
      { "aria-hidden": "true" },
    );
    const dropdownButtonText = htmlUtilities.createHTML(
      "span",
      "sr-only",
      "Extra actions for post",
    );

    dropdownButton.append(...[dropdownButtonIcon, dropdownButtonText]);

    const dropdownList = htmlUtilities.createHTML(
      "ul",
      "absolute font-accent divide-y divide-light-500 border border-light-500 font-medium right-0 top-9 hidden w-40 rounded-md bg-light-300 shadow-sm data-[dropdown-open='true']:block animate-once animate-fade animate-duration-100 animate-ease-in",
      null,
      {
        "data-open": "false",
        id: `dropdown-${this.postId}_list`,
        "aria-expanded": "false",
      },
    );

    const buttonClasses =
      "button w-full flex items-center rounded-none gap-2 p-3 transition-all hover:bg-light-400 active:bg-light-450";
    const editButton = htmlUtilities.createHTML(
      "button",
      `${buttonClasses} rounded-t-md`,
    );

    const editIcon = htmlUtilities.createHTML(
      "i",
      "bi bi-pencil-square",
      null,
      {
        "aria-hidden": "true",
      },
    );
    const editText = htmlUtilities.createHTML("span", null, "Edit post");
    editButton.append(...[editIcon, editText]);

    editButton.addEventListener("click", this.renderEditModal);

    const deleteButton = htmlUtilities.createHTML(
      "button",
      `${buttonClasses} rounded-b-md text-red-800`,
    );
    const deleteIcon = htmlUtilities.createHTML("i", "bi bi-trash3", null, {
      "aria-hidden": "true",
    });
    const deleteText = htmlUtilities.createHTML("span", null, "Delete post");
    deleteButton.append(...[deleteIcon, deleteText]);
    deleteButton.addEventListener("click", this.renderDeleteModal);

    dropdownList.append(...[editButton, deleteButton]);
    dropdown.append(dropdownButton, dropdownList);
    this.append(dropdown);
  }
}

customElements.define("post-dropdown", PostDropdown);
