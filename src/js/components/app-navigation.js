import htmlUtilities from "../helper/html-utilities/index.js";
import { handleFocusTrap } from "../helper/handle-focus-trap.js";
import { mobileMenuToggle } from "../helper/mobile-menu-toggle.js";
import { navigation } from "../const/navigation.js";

/**
 * Represents an `AppNavigation` class that creates a navigation component based on an imported constant configuration.
 * @class
 */
class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.currentPage = window.location.pathname;
    this.navigationItems = navigation;
  }

  connectedCallback() {
    this.render();
    const navClose = document.querySelector("#nav-close");
    const navButton = document.querySelector("#nav-button");

    navButton.addEventListener("click", (e) => {
      mobileMenuToggle(navButton);
      document.addEventListener("keydown", this.handleFocusNav);
    });

    navClose.addEventListener("click", this.closeNav);
  }

  userLogout() {
    // Logic for logging the user out
  }

  /**
   * Closes the navigation menu.
   * @param {MouseEvent} e - Event from click.
   */
  closeNav(e) {
    document.removeEventListener("keydown", this.handleFocusNav);
    mobileMenuToggle(document.querySelector("#nav-button"));
  }

  /**
   * Handles focus trapping in the navigation menu.
   * @param {MouseEvent} e - Click event.
   */
  // * The method has to be an arrow function, because of the context of the 'this' keyword in relation to class and eventlistener
  // * In order to preserve the 'this' context the callback function also need to use .bind(this)
  // * The reason being that the eventlistener callback has to be named in order to be removed at a later stage
  handleFocusNav = (e) => {
    const nav = document.querySelector(
      `#${document.querySelector("#nav-button").getAttribute("aria-controls")}`,
    );

    handleFocusTrap(nav, "button, a", this.closeNav.bind(this), e);
  };

  /**
   * Creates the top bar for navigation.
   * @returns {HTMLElement} - Top bar element.
   */
  createTopbar() {
    const topbar = htmlUtilities.createHTML(
      "div",
      "flex items-center gap-3 border-b border-light-500 px-7 py-2 md:px-0 md:pt-0",
    );

    const logo = htmlUtilities.createHTML(
      "a",
      "link link-secondary mr-auto text-lg font-bold md:pt-0",
      "Social",
      { href: "/feed/" },
    );

    const searchButtonClasses =
      "link link-secondary bottom-5 right-5 z-10 aspect-square w-12 text-lg md:fixed md:rounded-full md:bg-primary-400 md:px-2 md:text-light-200 md:shadow-sm md:hover:bg-primary-500 md:hover:text-light-200 lg:hidden";
    const searchButtonAttributes = {
      "aria-controls": "sidebar",
      "aria-expanded": "false",
      "aria-haspopup": "true",
      id: "sidebar-button",
    };

    const searchButton = htmlUtilities.createHTML(
      "button",
      searchButtonClasses,
      null,
      searchButtonAttributes,
    );
    const searchIcon = htmlUtilities.createHTML("i", "bi bi-search", null, {
      "aria-hidden": "true",
    });
    const searchText = htmlUtilities.createHTML(
      "span",
      "sr-only",
      "Open sidebar",
    );
    searchButton.append(...[searchIcon, searchText]);

    const navButtonAttributes = {
      "aria-controls": "primary-navigation",
      "aria-expanded": "false",
      "aria-haspopup": "true",
      id: "nav-button",
    };

    const navButton = htmlUtilities.createHTML(
      "button",
      "link link-secondary text-2xl md:hidden",
      null,
      navButtonAttributes,
    );
    const navIcon = htmlUtilities.createHTML("i", "bi bi-list", null, {
      "aria-hidden": "true",
    });
    const navText = htmlUtilities.createHTML("span", "sr-only", "Open menu");
    navButton.append(...[navIcon, navText]);

    topbar.append(...[logo, searchButton, navButton]);
    return topbar;
  }

  /**
   * Creates a navigation item element with icon and text.
   * @param {{ name, href, type, icon, id }} item - Object containing info about the item
   * @returns {HTMLElement} - Navigation item element.
   */
  createNavItem(item) {
    const { name, href, type, icon, id } = item;
    let navItem = "";
    const classes =
      "link link-secondary flex gap-2 item-center text-lg font-light w-full";
    if (type === "button") {
      navItem = htmlUtilities.createHTML("button", classes, null, { id: id });
      if (id === "create-post") {
        navItem.addEventListener("click", (e) => {
          document.querySelector("#modal_post-creation").showModal();
        });
      } else if (id === "logout") {
        navItem.addEventListener("click", this.userLogout);
      }
    } else {
      navItem = htmlUtilities.createHTML("a", classes, null, {
        href: href,
      });
    }

    let iconClass = icon.default;

    if (this.currentPage === href) {
      navItem.setAttribute("aria-current", "page");
      navItem.classList.add("font-medium");
      navItem.classList.remove("font-light");
      iconClass = icon.active;
    }

    const navItemIcon = htmlUtilities.createHTML("i", iconClass);

    const navItemName = htmlUtilities.createHTML("span", null, name);
    navItem.append(...[navItemIcon, navItemName]);

    return navItem;
  }

  /**
   * Renders navigation items and appends them to the list.
   * @param {HTMLElement} list - Element to which li tags are appended.
   */
  renderNavList(list) {
    for (const item of this.navigationItems) {
      const li = htmlUtilities.createHTML("li");
      const navItem = this.createNavItem(item);
      li.append(navItem);
      list.append(li);
    }
  }

  /**
   * Creates the navigation HTML element.
   * @returns {HTMLElement} - Navigation element.
   */
  createNav() {
    const navClasses =
      "inset-y-0 right-0 z-50 hidden w-full max-w-md flex-col bg-light-200 px-7 py-2 shadow-xl data-[mobile-visible='true']:absolute data-[mobile-visible='true']:flex data-[mobile-visible='true']:animate-slide md:block md:bg-light-400 md:px-0 md:shadow-none md:data-[mobile-visible='true']:static";

    const nav = htmlUtilities.createHTML("nav", navClasses, null, {
      id: "primary-navigation",
      "data-mobile-visible": "false",
    });

    const closeButtonAttributes = {
      "aria-controls": "primary-navigation",
      "aria-expanded": "true",
      id: "nav-close",
    };
    const closeButton = htmlUtilities.createHTML(
      "button",
      "link link-secondary ml-auto self-end text-2xl md:hidden",
      null,
      closeButtonAttributes,
    );
    const closeIcon = htmlUtilities.createHTML("i", "bi bi-x", null, {
      "aria-hidden": "true",
    });
    const closeText = htmlUtilities.createHTML("span", "sr-only", "Close menu");
    closeButton.append(...[closeIcon, closeText]);

    const navList = htmlUtilities.createHTML("ul");
    this.renderNavList(navList);

    nav.append(...[closeButton, navList]);
    return nav;
  }

  render() {
    const header = htmlUtilities.createHTML("header");
    const topbar = this.createTopbar();
    const nav = this.createNav();

    header.append(...[topbar, nav]);
    this.append(header);
  }
}

customElements.define("app-navigation", AppNavigation);
