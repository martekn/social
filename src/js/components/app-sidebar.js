import htmlUtilities from "../helper/html-utilities/index.js";
import { handleFocusTrap } from "../helper/handle-focus-trap.js";
import { mobileMenuToggle } from "../helper/mobile-menu-toggle.js";
import { TagItem } from "./tag-item.js";
import { UserBadge } from "./user-badge.js";
import { SearchBar } from "./search-bar.js";

const sidebarButton = document.querySelector("#sidebar-button");

// * Add the class 'sidebar' to the sidebar where its used in the html to avoid the layout from shifting
class AppSidebar extends HTMLElement {
  static get observedAttributes() {
    return ["tags-loaded", "following-loaded"];
  }
  constructor() {
    super();
    this.following = [];
    this.tags = [];
    this.isSearchpage = window.location.pathname === "/search/";
  }

  connectedCallback() {
    this.render();
    const sidebarClose = this.querySelector("#sidebar-close");

    sidebarButton.addEventListener("click", (e) => {
      mobileMenuToggle(sidebarButton);
      document.addEventListener("keydown", this.handleFocusSidebar);
    });

    sidebarClose.addEventListener("click", this.closeSidebar);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "tags-loaded" && newValue === "true") {
      this.renderTags(this.tags);
    }

    if (name === "following-loaded" && newValue === "true") {
      this.renderFollowing(this.following);
    }
  }

  /**
   * Toggles menu visibility and removes eventhandler
   * @param {MouseEvent} e - Event from click
   */
  closeSidebar(e) {
    mobileMenuToggle(sidebarButton);
    document.removeEventListener("keydown", this.handleFocusSidebar);
  }

  /**
   * Handles focus trapping in the sidebar menu.
   * @param {MouseEvent} e - Click event.
   */
  // * The method has to be an arrow function, because of the context of the 'this' keyword in relation to class and eventlistener
  // * In order to preserve the 'this' context the callback function also need to use .bind(this)
  // * The reason being that the eventlistener callback has to be named in order to be removed at a later stage
  handleFocusSidebar = (e) => {
    const sidebar = document.querySelector(
      `#${sidebarButton.getAttribute("aria-controls")}`,
    );

    handleFocusTrap(
      sidebar,
      "button, a, input",
      this.closeSidebar.bind(this),
      e,
    );
  };

  /**
   * Renders a section element for the sidebar.
   * @param {String} text - Heading text.
   * @param {String} listId - ID for the list element.
   * @returns {HTMLElement} - Section element containing heading and ul.
   */
  renderSection(text, listId) {
    const section = htmlUtilities.createHTML("section", "py-4");
    const heading = htmlUtilities.createHTML(
      "h2",
      "font-light text-dark-300",
      text,
    );
    const list = htmlUtilities.createHTML("ul", "space-y-2", null, {
      id: listId,
    });
    section.append(...[heading, list]);
    return section;
  }

  renderTags() {
    for (const tag of this.tags) {
      const li = htmlUtilities.createHTML("li");
      li.append(new TagItem(tag, "secondary"));
      document.querySelector("#tags-list").append(li);
    }
  }

  renderFollowing() {
    for (const user of this.following) {
      const li = htmlUtilities.createHTML("li");
      const username = new UserBadge(user);
      li.append(username);
      document.querySelector("#following-list").append(li);
    }
  }

  render() {
    const sidebar = htmlUtilities.createHTML("aside", "flex flex-col");
    const closeButton = htmlUtilities.createHTML(
      "button",
      "link link-secondary ml-auto self-end text-2xl lg:hidden",
      null,
      {
        "aria-controls": "sidebar",
        "aria-expanded": "true",
        id: "sidebar-close",
      },
    );

    const buttonIcon = htmlUtilities.createHTML("i", "bi bi-x", null, {
      "aria-hidden": "true",
    });

    const buttonText = htmlUtilities.createHTML(
      "span",
      "sr-only",
      "close sidebar",
    );
    closeButton.append(...[buttonIcon, buttonText]);

    const contentContainer = htmlUtilities.createHTML(
      "div",
      "divide-y divide-light-500",
    );

    const searchbar = new SearchBar("sidebar-search");

    const content = htmlUtilities.createHTML(
      "div",
      "divide-y divide-light-500",
    );
    const tagsSection = this.renderSection("Popular tags", "tags-list");
    if (this.isSearchpage) {
      tagsSection.classList.add("border-t-0");
    }

    const followingSection = this.renderSection("Following", "following-list");

    const footer = htmlUtilities.createHTML(
      "footer",
      "flex items-center gap-1 py-4 text-sm text-dark-300 font-accent",
    );
    const footerIcon = htmlUtilities.createHTML("i", "bi bi-c-circle");
    const footerText = htmlUtilities.createHTML(
      "span",
      null,
      "2023 Marte Knutsen",
    );
    footer.append(...[footerIcon, footerText]);

    content.append(...[tagsSection, followingSection, footer]);
    contentContainer.append(...[searchbar, content]);

    sidebar.append(closeButton, contentContainer);

    if (this.isSearchpage) {
      contentContainer.classList.add("lg:divide-y-0");
      searchbar.classList.add("lg:hidden");
      content.classList.add(...["lg:divide-y", "lg:divide-light-500"]);
    }

    this.setAttribute("id", "sidebar");
    this.setAttribute("data-mobile-visible", "false");
    this.classList.add("sidebar");
    this.append(sidebar);
  }
}

customElements.define("app-sidebar", AppSidebar);
