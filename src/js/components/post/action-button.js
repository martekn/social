import htmlUtilities from "../../helper/html-utilities/index.js";

class PostAction extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let action;
    const actionClasses =
      "p-1 hover:bg-light-450 w-full flex hover:text-dark-500 align-middle gap-2 justify-center rounded-md transition-all duration-200 ease-in-out";

    if (this.getAttribute("type") === "link") {
      action = htmlUtilities.createHTML("a", actionClasses, null, {
        href: this.getAttribute("href"),
      });
    } else {
      action = htmlUtilities.createHTML("button", actionClasses);
    }
    const icon = htmlUtilities.createHTML("i", this.getAttribute("icon"));
    const buttonText = htmlUtilities.createHTML(
      "span",
      "sr-only sm:not-sr-only",
      this.textContent,
    );
    this.textContent = "";
    action.append(...[icon, buttonText]);

    this.classList.add("w-full");
    this.appendChild(action);
  }
}

customElements.define("post-action", PostAction);
