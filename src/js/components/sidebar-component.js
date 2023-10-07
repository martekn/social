import htmlUtilities from "../helper/html-utilities/index.js";
import { tags } from "../const/test-data/tags.js";
import { following } from "../const/test-data/following.js";
import { handleFocusTrap } from "../helper/handle-focus-trap.js";
import { mobileMenuToggle } from "../helper/mobile-menu-toggle.js";

const sidebarButton = document.querySelector("#sidebar-button");

/**
 * The component has to be inserted into an aside element with existing classes
 * If not the layout will shift quite heavily on load
 * @example
 * ```html
 *  <aside id="sidebar" data-mobile-visible="false" class="inset-y-0 right-0 z-50 order-2 hidden w-full max-w-md bg-light-200 p-7 pt-2 shadow-xl    transition-all data-[mobile-visible='true']:absolute data-[mobile-visible='true']:block data-[mobile-visible='true']:animate-slide md:pt-7 lg:col-span-3 lg:block lg:bg-light-400 lg:px-10 lg:shadow-none lg:data-[mobile-visible='true']:static" >
      <sidebar-component></sidebar-component>
    </aside>
 * ```
 */
class SidebarComponent extends HTMLElement {
  constructor() {
    super();
    this.following = following;
    this.tags = tags;
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

  /**
   * Toggles menu visibility and removes eventhandler
   * @param {MouseEvent} e - Event from click
   */
  closeSidebar(e) {
    mobileMenuToggle(sidebarButton);
    document.removeEventListener("keydown", this.handleFocusSidebar);
  }

  /**
   * Callback function for event
   * Setup for focus trap
   * @param {MouseEvent} e - Event from click eventlistener
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
   * Creates username element
   * @param {{name, avatar}} user - User information
   * @returns Username element with avatar and name
   */
  renderUsername(user) {
    const username = htmlUtilities.createHTML(
      "a",
      "flex items-center link link-secondary gap-2 py-1",
      null,
      {
        href: `/profile/?u=${user.name}`,
      },
    );

    const avatar = htmlUtilities.createHTML(
      "img",
      "aspect-square w-11 rounded-full object-cover",
      null,
      {
        src: user.avatar
          ? user.avatar
          : "/assets/images/avatar-placeholder.jpg",
        alt: user.name,
      },
    );

    const name = htmlUtilities.createHTML("span", null, user.name);

    htmlUtilities.appendArray([avatar, name], username);
    return username;
  }

  /**
   * Creates section element for the sidebar
   * @param {String} text - Text for the heading
   * @returns Section element containing heading and ul
   */
  renderSection(text) {
    const section = htmlUtilities.createHTML("section", "py-4");
    const heading = htmlUtilities.createHTML(
      "h2",
      "font-light text-dark-300",
      text,
    );
    const list = htmlUtilities.createHTML("ul", "space-y-2");
    section.append(...[heading, list]);
    return section;
  }

  /**
   * Creates popular tags section
   * @returns Section element containing a list of tags
   */
  renderTags() {
    const section = this.renderSection("Popular tags");
    if (this.isSearchpage) {
      section.classList.add("border-t-0");
    }
    const list = section.querySelector("ul");

    for (const tag of this.tags) {
      const li = htmlUtilities.createHTML("li");
      const tagItem = htmlUtilities.createHTML("tag-item", null, tag, {
        "data-style": "secondary",
      });
      li.append(tagItem);
      list.append(li);
    }
    return section;
  }

  /**
   * Creates following section
   * @returns Section element containing a list of following
   */
  renderFollowing() {
    const section = this.renderSection("Following");
    const list = section.querySelector("ul");

    for (const user of this.following) {
      const li = htmlUtilities.createHTML("li");
      const username = this.renderUsername(user);
      li.append(username);
      list.append(li);
    }
    return section;
  }

  render() {
    const sidebar = htmlUtilities.createHTML("div", "container flex flex-col");

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

    const searchbar = htmlUtilities.createHTML("search-bar", "mb-4");

    const content = htmlUtilities.createHTML(
      "div",
      "divide-y divide-light-500",
    );
    const tagsSection = this.renderTags();
    const followingSection = this.renderFollowing();

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

    this.appendChild(sidebar);
  }
}

customElements.define("sidebar-component", SidebarComponent);
