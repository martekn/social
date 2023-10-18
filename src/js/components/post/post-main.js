import htmlUtilities from "../../helper/html-utilities/index.js";

/**
 * Represents the main section of a post, displaying the title, body text, and media content (image or video).
 * @class
 */
export class PostMain extends HTMLElement {
  /**
   * Create a new PostMain instance.
   * @constructor
   * @param {string} title - The title of the post.
   * @param {string} body - The body text of the post.
   * @param {string} media - The URL to the media content (image or video) associated with the post.
   */
  constructor(title, body, media) {
    super();

    this.title = title ?? "";
    this.body = body ?? "";
    this.media = media ?? "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const main = htmlUtilities.createHTML("main", "space-y-2");

    if (this.media) {
      const postImage = htmlUtilities.createHTML(
        "img",
        "rounded-md mb-4 w-full",
        null,
        {
          src: this.media,
          alt: "",
          onerror:
            "this.onerror=null;this.src='/assets/images/img-placeholder.jpg';",
        },
      );
      main.append(postImage);
    }

    if (this.title) {
      const postTitle = htmlUtilities.createHTML("h2", "break-all", this.title);
      main.append(postTitle);
    }

    if (this.body) {
      const postBody = htmlUtilities.createHTML(
        "p",
        "text-dark-400 break-all",
        this.body,
      );
      main.append(postBody);
    }

    this.append(main);
  }
}

customElements.define("post-main", PostMain);
