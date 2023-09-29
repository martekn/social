import htmlUtilities from "../helper/html-utilities/index.js";

class NavItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let classes =
      "font-accent hover:text-dark-400 flex gap-2 item-center text-lg py-2 w-full";
    if (this.getAttribute("aria-current") === "page") {
      classes += " font-medium";
    } else {
      classes += " font-light";
    }

    const url = this.getAttribute("href");
    let navItem = "";
    if (url) {
      navItem = htmlUtilities.createHTML("a", classes, null, {
        href: this.getAttribute("href"),
      });
    } else {
      navItem = htmlUtilities.createHTML("button", classes);
    }

    const iconClasses = this.getAttribute("icon");
    const icon = htmlUtilities.createHTML("i", iconClasses);

    const navItemName = htmlUtilities.createHTML(
      "span",
      null,
      this.textContent,
    );

    htmlUtilities.appendArray([icon, navItemName], navItem);
    this.innerHTML = "";
    this.appendChild(navItem);
  }
}

customElements.define("nav-item", NavItem);
