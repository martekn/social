import htmlUtilities from "../helper/html-utilities/index.js";

export class UserBadge extends HTMLElement {
  constructor({ avatar, name }) {
    super();
    this.avatar =
      avatar ||
      this.getAttribute("image-url") ||
      "/assets/images/avatar-placeholder.jpg";
    this.name = name ?? this.getAttribute("name") ?? "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const username = htmlUtilities.createHTML(
      "a",
      "flex items-center link link-secondary gap-2 py-1",
      null,
      {
        href: `/profile/?u=${this.name}`,
      },
    );

    const avatar = htmlUtilities.createHTML(
      "img",
      "aspect-square w-11 rounded-full object-cover",
      null,
      {
        src: this.avatar,
        alt: this.name,
      },
    );

    const name = htmlUtilities.createHTML("span", null, this.name);

    username.append(...[avatar, name]);
    this.append(username);
  }
}

customElements.define("user-badge", UserBadge);
