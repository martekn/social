import { request } from "../request.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Creates a new social media post.
 *
 * @async
 * @function
 *
 * @param {Object} body - The data representing the new post to be created.
 * @param {string} body.title - The title of the post (Required).
 * @param {string} [body.body] - The main content of the post (Optional).
 * @param {string[]} [body.tags] - An array of tags associated with the post (Optional).
 * @param {string} [body.media] - The URL to the media content (image or video) associated with the post (Optional).
 *
 * @returns {Promise<Object>} A Promise that resolves to the response object from the server.
 */
export const createPost = async (body) => {
  if (body.tags) {
    body.tags = body.tags.trim().split(" ");
  } else {
    body.tags = [];
  }

  const response = await request(
    `${baseApiPath}/posts`,
    { _author: "true", _reactions: "true", _comments: "true" },
    true,
    "POST",
    body,
  );

  return response;
};
