import htmlUtilities from "../helper/html-utilities/index.js";

class TagItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const tag = htmlUtilities.createHTML("a", "py-1 w-full", null, {
      href: this.getAttribute("href"),
    });

    if (this.dataset.style === "primary") {
      tag.classList.add("link-primary");
    } else {
      tag.classList.add("link-secondary");
    }

    const hashtag = htmlUtilities.createHTML(
      "span",
      ["text-sm", "font-light", "text-dark-300"],
      "#",
    );

    const tagName = htmlUtilities.createHTML(
      "span",
      "font-medium",
      this.textContent,
    );

    htmlUtilities.appendArray([hashtag, tagName], tag);
    this.innerHTML = "";
    this.appendChild(tag);
  }
}

customElements.define("tag-item", TagItem);
