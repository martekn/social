import htmlUtilities from "../helper/html-utilities/index.js";

/**
 * Represents a `TagItem` class that creates a link element for displaying a tag with an optional tag style.
 * @class
 */
export class TagItem extends HTMLElement {
  /**
   * Create a new `TagItem` instance.
   * @constructor
   * @param {String} tag - The tag name to be displayed.
   * @param {String} [tagStyle="secondary"] - The tag style, which can be "secondary" or "primary" (default is "secondary").
   */
  constructor(tag, tagStyle) {
    super();
    this.tag = tag ?? this.getAttribute("tag");
    this.tagStyle = tagStyle ?? this.getAttribute("tag-style") ?? "secondary";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const tag = htmlUtilities.createHTML("a", "py-1 w-full", null, {
      href: `/search/?search=${this.tag.replace("#", "")}&action=tags`,
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
