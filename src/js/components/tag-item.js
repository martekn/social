import htmlUtilities from "../helper/html-utilities/index.js";

export class TagItem extends HTMLElement {
  constructor(tag, tagStyle) {
    super();
    this.tag = tag ?? this.getAttribute("tag") ?? "";
    this.tagStyle = tagStyle ?? this.getAttribute("tag-style") ?? "secondary";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const tag = htmlUtilities.createHTML("a", "py-1 w-full", null, {
      href: `/search/?tag=${this.tag.replace("#", "")}`,
    });

    if (this.tagStyle === "primary") {
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
      this.tag.replace("#", ""),
    );

    tag.append(...[hashtag, tagName]);
    this.append(tag);
  }
}

customElements.define("tag-item", TagItem);
