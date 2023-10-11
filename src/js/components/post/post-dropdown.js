import htmlUtilities from "../../helper/html-utilities/index.js";
import { stringToBoolean } from "../../helper/string-to-boolean.js";
import { handleFocusTrap } from "../../helper/handle-focus-trap.js";
import { PostModal } from "../post-modal.js";
import { PostDeleteModal } from "./post-delete-modal.js";

export class PostDropdown extends HTMLElement {
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

      dropdownButton.setAttribute("aria-expanded", state);

      const list = this.querySelector(`#dropdown-${this.postId}_list`);
      list.setAttribute("aria-expanded", state);
      list.setAttribute("data-dropdown-open", state);

      if (state) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    });
  }

  setDropdownFocus(e) {
    const dropdown = this.querySelector(`#dropdown-${this.postId}`);
    handleFocusTrap(dropdown, "button", this.closeDropdown, e);
  }

  openDropdown() {
    this.addEventListener("keydown", this.setDropdownFocus);
  }

  closeDropdown = () => {
    this.removeEventListener("keydown", this.setDropdownFocus);
  };

  renderEditModal = () => {
    const main = document.querySelector("main");
    const modal = new PostModal(this.post);

    main.append(modal);
    modal.querySelector("dialog").showModal();
    console.log(modal);
  };

  renderDeleteModal = () => {
    const main = document.querySelector("main");
    const modal = new PostDeleteModal(this.postId);
    main.append(modal);
    modal.querySelector("dialog").showModal();
  };

  render() {
    this.classList.add("ml-auto");

    const dropdown = htmlUtilities.createHTML("div", "relative", null, {
      id: `dropdown-${this.postId}`,
    });
    const dropdownButton = htmlUtilities.createHTML(
      "button",
      "aspect-square h-8 rounded-md text-dark-300 hover:bg-light-400",
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
      "absolute font-accent divide-y divide-light-500 font-medium right-0 top-9 hidden w-40 rounded-md bg-light-400 p-1 shadow-sm data-[dropdown-open='true']:block",
      null,
      {
        "data-open": "false",
        id: `dropdown-${this.postId}_list`,
        "aria-expanded": "false",
      },
    );
    const editButton = htmlUtilities.createHTML(
      "button",
      "flex w-full font-accent font-medium items-center gap-2 rounded-sm p-3 hover:bg-light-300",
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
      "flex w-full items-center gap-2 rounded-sm p-3 text-red-800 hover:bg-light-300",
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
