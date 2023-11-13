import { request } from "../request.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Posts a comment to a social media post.
 *
 * @param {string} body - The content of the comment.
 * @param {number} id - The unique identifier of the post to which the comment will be added.
 * @returns {Promise} A Promise that resolves to the response from the server after posting the comment.
 */
export const postComment = (body, id) =>
  request(`${baseApiPath}/posts/${id}/comment`, null, true, "POST", body);
