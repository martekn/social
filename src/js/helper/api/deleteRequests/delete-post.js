import { request } from "../request.js";

/**
 * Deletes a social media post by its ID.
 *
 * @async
 * @function
 * @param {string|number} id - The ID of the post to be deleted.
 * @returns {Promise<Object>} A Promise that resolves to the response object from the server.
 */
export const deletePost = async (id) => {
  const response = await request(
    `/api/v1/social/posts/${id}`,
    null,
    true,
    "DELETE",
  );

  return response;
};
