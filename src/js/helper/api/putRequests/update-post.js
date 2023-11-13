import { request } from "../request.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Updates a social media post by its ID.
 *
 * @async
 * @function
 * @param {string|number} id - The ID of the post to be updated.
 * @param {Object} body - The data representing the updated post.
 * @param {string} body.title - The updated title of the post (Required).
 * @param {string} [body.body] - The updated main content of the post (Optional).
 * @param {string|string[]} [body.tags] - The updated tags associated with the post (Optional).
 * @param {string} [body.media] - The updated URL to the media content (image or video) associated with the post (Optional).
 * @returns {Promise<Object>} A Promise that resolves to the response object from the server.
 */
export const updatePost = async (id, body) => {
  if (body.tags) {
    body.tags = body.tags.trim().split(" ");
  } else {
    body.tags = [];
  }

  const response = await request(
    `${baseApiPath}/posts/${id}`,
    null,
    true,
    "PUT",
    body,
  );

  return response;
};
