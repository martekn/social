import { SocialPost } from "../components/post/social-post.js";
import htmlUtilities from "./html-utilities/index.js";

/**
 * Render a list of social media posts and append them to a parent element.
 *
 * @param {Array} posts - An array of social media posts to be rendered.
 * @param {HTMLElement} parent - The parent element to which the rendered posts will be appended.
 *
 * @example
 * ```js
 * const posts = [
 *   { content: "Hello, world!", author: "User123" },
 *   { content: "Another post!", author: "User456" },
 * ];
 *
 * const postContainer = document.getElementById("post-container");
 * renderPosts(posts, postContainer);
 * ```
 */
export const renderPosts = (posts, parent) => {
  const articles = [];
  for (const post of posts) {
    const li = htmlUtilities.createHTML("li");
    li.append(new SocialPost(post));
    articles.push(li);
  }

  parent.append(...articles);
};
