import htmlUtilities from "../helper/html-utilities/index.js";
import { getTimeSince } from "../helper/get-time-since.js";

class PostArticle extends HTMLElement {
  constructor() {
    super();
    this.postData = {};
  }

  connectedCallback() {
    this.render();
  }

  /**
   * Creates header element of the post
   * @param {{name: String, avatar: String}} author - Author obj containing the username and url for avatar
   * @param {dateString} created - String for the day post got created
   * @param {dateString} updated - String for the day post got updated
   * @returns Header element
   * @example
   * ```js
   * const author = {name: "username", avatar: "https://placehold.co/600x400"}
   * const header = createHeader(author, "2023-10-03T10:42:13.452Z", "2023-10-03T18:26:13.913Z")
   * ```
   */
  createHeader(author, created, updated) {
    const time = getTimeSince(created);
    const isFollowing = true;
    const isEdited = !created === updated;

    const header = htmlUtilities.createHTML(
      "header",
      "flex gap-2 align-middle",
    );

    // Avatar
    const imgWrapper = htmlUtilities.createHTML(
      "a",
      "w-10 h-10 my-auto",
      null,
      { href: `/profile/?u=${author.name}` },
    );

    const img = htmlUtilities.createHTML(
      "img",
      "object-cover rounded-full w-full h-full",
      null,
      {
        src: author?.avatar ?? "/assets/images/avatar-placeholder.png",
        alt: author.name,
      },
    );
    const imgSrOnly = htmlUtilities.createHTML("span", "sr-only", author.name);
    imgWrapper.append(...[img, imgSrOnly]);

    // Details
    const headerDetails = htmlUtilities.createHTML("div");
    const userDetails = htmlUtilities.createHTML("div", "flex gap-3");
    const username = htmlUtilities.createHTML(
      "a",
      "link link-secondary p-0",
      author.name,
      { href: `/profile/?u=${author.name}` },
    );
    userDetails.append(username);

    if (!isFollowing) {
      const follow = htmlUtilities.createHTML(
        "button",
        "before:w-1 before:rounded-full before:h-1 p-0 gap-3 align-middle flex before:block before:bg-dark-300 before:self-center link link-primary",
        "Follow",
      );
      userDetails.append(follow);
    }

    const timeDetails = htmlUtilities.createHTML(
      "div",
      "flex gap-3 text-dark-400 -mt-0.5 text-sm font-light font-accent",
    );
    const timeSince = htmlUtilities.createHTML("div", null, time);
    timeDetails.append(timeSince);

    if (isEdited) {
      const edited = htmlUtilities.createHTML(
        "div",
        "before:w-0.5 before:rounded-full before:h-0.5 gap-3 align-middle flex before:block before:bg-dark-300 before:self-center",
        "Edited",
      );
      timeDetails.append(edited);
    }

    headerDetails.append(...[userDetails, timeDetails]);

    header.append(...[imgWrapper, headerDetails]);

    return header;
  }

  /**
   * Creates main element of the post
   * @param {String} media - URL to an image or video
   * @param {String} title - Title of post
   * @param {String} body - Body text of post
   * @returns Main element
   * @example
   * ```js
   * const main = createMain("https://placehold.co/600x400", "Post title", "Body text")
   * ```
   */
  createMain(media, title, body) {
    const main = htmlUtilities.createHTML("main", "space-y-2");

    if (media) {
      const postImage = htmlUtilities.createHTML(
        "img",
        "rounded-md mb-4",
        null,
        {
          src: media,
          alt: "",
        },
      );
      main.append(postImage);
    }

    if (title) {
      const postTitle = htmlUtilities.createHTML("h2", null, title);
      main.append(postTitle);
    }

    if (body) {
      const postBody = htmlUtilities.createHTML("p", "text-dark-400", body);
      main.append(postBody);
    }

    return main;
  }

  /**
   * Creates footer element for the post
   * @param {Number|String} id - id of post
   * @param {String[]} tags - Post tags
   * @param {Number|String} reactionCount - Number indicating how many reactions a post has
   * @param {Number|String} commentCount - Number indicating how many comments a post has
   * @returns Footer element
   * @example
   * ```js
   * const footer = createFooter(34, ["tag1", "tag2"], 3, 4)
   * ```
   */
  createFooter(id, tags, reactionCount, commentCount) {
    const footer = htmlUtilities.createHTML("footer", "space-y-2");
    const footerDetails = htmlUtilities.createHTML(
      "div",
      "flex flex-col sm:justify-between sm:flex-row",
    );

    const tagList = htmlUtilities.createHTML("ul", "flex gap-2");
    if (tags.length > 0) {
      for (const tag of tags) {
        const li = htmlUtilities.createHTML("li");
        const tagElem = htmlUtilities.createHTML(
          "tag-item",
          null,
          tag.replace("#", ""),
          {
            "data-style": "primary",
          },
        );

        li.appendChild(tagElem);
        tagList.append(li);
      }
    }

    const reactionDetails = htmlUtilities.createHTML(
      "div",
      "space-x-5 text-sm flex text-dark-400 font-accent",
    );

    if (reactionCount > 0) {
      const wrapper = htmlUtilities.createHTML("div", "space-x-1");
      const heartCounter = htmlUtilities.createHTML(
        "span",
        "font-medium",
        reactionCount,
      );
      const heartText = htmlUtilities.createHTML("span", null, "hearts");
      wrapper.append(...[heartCounter, heartText]);

      reactionDetails.append(wrapper);
    }

    if (commentCount > 0) {
      const wrapper = htmlUtilities.createHTML(
        "button",
        "space-x-1 hover:text-dark-500 hover:border-b hover:border-dark-300 pb-[1px] hover:pb-0",
      );
      const commentCounter = htmlUtilities.createHTML(
        "span",
        "font-medium",
        commentCount,
      );
      const commentText = htmlUtilities.createHTML("span", null, "comments");
      wrapper.append(...[commentCounter, commentText]);

      reactionDetails.append(wrapper);
    }

    footerDetails.append(...[tagList, reactionDetails]);

    const actions = htmlUtilities.createHTML(
      "div",
      "flex justify-evenly text-dark-400 border-t pt-1 font-medium border-light-500",
    );

    const heartAction = htmlUtilities.createHTML(
      "post-action",
      "w-full",
      "Heart",
      {
        icon: "bi bi-heart",
        type: "button",
      },
    );

    const commentAction = htmlUtilities.createHTML(
      "post-action",
      "w-full",
      "comment",
      { icon: "bi bi-chat-square", type: "button" },
    );

    const viewAction = htmlUtilities.createHTML(
      "post-action",
      "w-full",
      "view",
      {
        icon: "bi bi-box-arrow-up-right",
        type: "link",
        href: `/post/?id=${id}`,
      },
    );

    actions.append(...[heartAction, commentAction, viewAction]);

    footer.append(...[footerDetails, actions]);
    return footer;
  }

  render() {
    const { id, title, body, tags, media, author, _count, created, updated } =
      this.postData;

    const article = htmlUtilities.createHTML(
      "article",
      "rounded-md bg-light-200 space-y-4 px-6 pt-6 pb-1 shadow-sm",
    );

    const header = this.createHeader(author, created, updated);
    const main = this.createMain(media, title, body);

    const footer = this.createFooter(
      id,
      tags,
      _count.reactions,
      _count.comments,
    );

    article.append(...[header, main, footer]);
    this.appendChild(article);
  }
}

customElements.define("post-article", PostArticle);
