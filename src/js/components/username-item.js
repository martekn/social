import htmlUtilities from "../helper/html-utilities/index.js";

class username extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const username = htmlUtilities.createHTML(
      "a",
      "flex items-center hover:text-dark-400 gap-2 font-accent font-medium py-1",
      null,
      {
        href: `/profile/?u=${this.textContent}`,
      },
    );

    const avatar = htmlUtilities.createHTML(
      "img",
      "aspect-square w-9 rounded-full object-cover",
      null,
      {
        src: this.getAttribute("src"),
        alt: this.getAttribute("alt"),
      },
    );

    const name = htmlUtilities.createHTML("span", null, this.textContent);

    htmlUtilities.appendArray([avatar, name], username);
    this.innerHTML = "";
    this.appendChild(username);
  }
}

customElements.define("username-item", username);
