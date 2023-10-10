import htmlUtilities from "../../helper/html-utilities/index.js";

export class PostMain extends HTMLElement {
  constructor(title, body, media) {
    super();

    this.title = title;
    this.body = body;
    this.media = media;
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
