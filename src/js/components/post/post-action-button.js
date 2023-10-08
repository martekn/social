import htmlUtilities from "../../helper/html-utilities/index.js";

export class PostActionButton extends HTMLElement {
  constructor(text, iconClasses, type, href) {
    super();

    this.text = text ?? "";
    this.iconClasses = iconClasses ?? "";
    this.type = type ?? "button";
    this.href = href ?? "#";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let action;
    const actionClasses =
      "p-1 hover:bg-light-450 w-full flex hover:text-dark-500 align-middle gap-2 justify-center rounded-md transition-all duration-200 ease-in-out";

    if (this.type === "link") {
      action = htmlUtilities.createHTML("a", actionClasses, null, {
        href: this.href,
      });
    } else {
      action = htmlUtilities.createHTML("button", actionClasses);
    }
    const icon = htmlUtilities.createHTML("i", this.iconClasses);
    const buttonText = htmlUtilities.createHTML(
      "span",
      "sr-only sm:not-sr-only",
      this.text,
    );

    action.append(...[icon, buttonText]);

    this.classList.add("w-full");
    this.append(action);
  }
}

customElements.define("post-action-button", PostActionButton);
