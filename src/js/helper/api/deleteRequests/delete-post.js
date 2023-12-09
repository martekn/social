import { request } from "../request.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Deletes a social media post by its ID.
 *
 * @async
 * @function
 * @param {string|number} id - The ID of the post to be deleted.
 * @returns {Promise<Object>} A Promise that resolves to the response object from the server.
 */
export const deletePost = async (id) =>
  request(`${baseApiPath}/posts/${id}`, null, true, "DELETE");
