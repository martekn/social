import { reactToPost } from "../../helper/api/putRequests/react-to-post.js";
import htmlUtilities from "../../helper/html-utilities/index.js";
import { renderToast } from "../../helper/render-toast.js";
import { TagItem } from "../tag-item.js";
import { PostActionButton } from "./post-action-button.js";

/**
 * Represents the footer of a post, displaying metadata such as comment and like counts, action buttons for liking, commenting, and viewing, and the post's tags.
 * @class
 */
export class PostFooter extends HTMLElement {
  /**
   * Create a new PostFooter instance.
   * @constructor
   * @param {String|Number} id - The ID of the post to which the footer is associated.
   * @param {String[]} tags - An array of tags associated with the post.
   * @param {String|Number} commentCount - The number of comments on the post.
   * @param {String|Number} reactionCount - The number of reactions (e.g., likes) for the post.
   */
  constructor(id, tags, commentCount, reactionCount) {
    super();

    this.buttonId = id;
    this.tags = tags;
    this.commentCount = commentCount;
    this.reactionCount = reactionCount;
  }

  connectedCallback() {
    this.render();
  }

  async reactionHandler() {
    try {
      const response = await reactToPost(this.buttonId);
      const reactionCounterContainer = this.querySelector(
        `#reaction-counter-${this.buttonId}`,
      );
      const reactionCount = reactionCounterContainer.querySelector(
        `#reaction-count-${this.buttonId}`,
      );
      const currentCount = Number(reactionCount.innerText);
      reactionCount.innerText = currentCount + 1;
      if (reactionCounterContainer.classList.contains("hidden")) {
        reactionCounterContainer.classList.remove("hidden");
      }

      const reactionButton = this.querySelector(
        `#action-heart-${this.buttonId}`,
      );
      const icon = reactionButton.querySelector("i");
      icon.classList.add(..."relative bi-heart-fill".split(" "));
      icon.classList.remove("bi-heart");

      const reactionIcon = htmlUtilities.createHTML(
        "i",
        "bi-heart-fill text-primary-400 m-auto absolute inset-0 animate-jump animate-duration-500",
      );

      icon.append(reactionIcon);

      setTimeout(() => {
        icon.classList.add("bi-heart");
        icon.classList.remove("bi-heart-fill");
        reactionIcon.classList.remove("animate-jump");
        reactionIcon.classList.add(
          ..."animate-fade [animation-direction:reverse] animate-duration-300".split(
            " ",
          ),
        );
      }, 500);

      setTimeout(() => {
        reactionIcon.remove();
      }, 800);
    } catch (error) {
      renderToast(
        "Error: Unable to heart post at the moment, please try again later",
        "reaction-error",
        "error",
      );
    }
  }

  render() {
    const footer = htmlUtilities.createHTML("footer", "space-y-2");
    const footerDetails = htmlUtilities.createHTML(
      "div",
      "flex flex-col sm:justify-between sm:flex-row",
    );

    const tagList = htmlUtilities.createHTML("ul", "flex gap-2 flex-wrap");
    if (this.tags.length > 0) {
      for (const tag of this.tags) {
        if (!tag) {
          continue;
        }
        const li = htmlUtilities.createHTML("li");
        const tagElem = new TagItem(tag, "primary");

        li.append(tagElem);
        tagList.append(li);
      }
    }

    const reactionDetails = htmlUtilities.createHTML(
      "div",
      "space-x-5 text-sm flex ml-auto items-center text-dark-400 font-accent",
    );

    const heartContainer = htmlUtilities.createHTML("div", "space-x-1", null, {
      id: `reaction-counter-${this.buttonId}`,
    });
    const heartCounter = htmlUtilities.createHTML(
      "span",
      "font-medium",
      this.reactionCount,
      { id: `reaction-count-${this.buttonId}` },
    );
    const heartText = htmlUtilities.createHTML("span", null, "hearts");
    heartContainer.append(...[heartCounter, heartText]);

    reactionDetails.append(heartContainer);
    if (this.reactionCount == 0) {
      heartContainer.classList.add("hidden");
    }

    const commentContainer = htmlUtilities.createHTML(
      "button",
      "space-x-1 hover:text-dark-500 hover:border-b hover:border-dark-300 pb-[1px] hover:pb-0 transition-color",
      null,
      { id: `comment-counter-${this.buttonId}` },
    );
    const commentCounter = htmlUtilities.createHTML(
      "span",
      "font-medium",
      this.commentCount,
      { id: `comment-count-${this.buttonId}` },
    );
    const commentText = htmlUtilities.createHTML("span", null, "comments");
    commentContainer.append(...[commentCounter, commentText]);

    reactionDetails.append(commentContainer);

    if (this.commentCount == 0) {
      commentContainer.classList.add("hidden");
    }

    footerDetails.append(...[tagList, reactionDetails]);

    const actions = htmlUtilities.createHTML(
      "div",
      "flex justify-evenly border-t border-light-500 pt-1 font-medium text-dark-400 data-[comments-visible='true']:border-b data-[comments-visible='true']:border-light-450 data-[comments-visible='true']:pb-1",
      null,
      { "data-comments-visible": "false" },
    );

    const reactionButton = new PostActionButton(
      "Heart",
      "bi bi-heart",
      "button",
      null,
      "action-heart",
      this.buttonId,
    );
    reactionButton.addEventListener("click", this.reactionHandler.bind(this));

    const commentButton = new PostActionButton(
      "Comment",
      "bi bi-chat-square",
      "button",
      null,
      "action-comment",
      this.buttonId,
    );
    const viewButton = new PostActionButton(
      "View",
      "bi bi-box-arrow-up-right",
      "link",
      `/post/?id=${this.buttonId}`,
      "action-view",
      this.buttonId,
    );

    actions.append(...[reactionButton, commentButton, viewButton]);

    footer.append(...[footerDetails, actions]);

    this.append(footer);
  }
}

customElements.define("post-footer", PostFooter);
