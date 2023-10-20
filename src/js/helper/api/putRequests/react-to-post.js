import { request } from "../request.js";

/**
 * React to a post by sending a PUT request to the server.
 *
 * @param {string} id - The ID of the post to react to.
 * @returns {Promise} A Promise that resolves with the response data from the server.
 */
export const reactToPost = async (id) => {
  const response = await request(
    `/api/v1/social/posts/${id}/react/🧡`,
    null,
    true,
    "PUT",
  );
  return response;
};
