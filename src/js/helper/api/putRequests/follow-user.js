import { request } from "../request.js";

/**
 * Follow a user by sending a PUT request to the server.
 *
 * @param {string} user - The username of the user to follow.
 * @returns {Promise} A Promise that resolves with the response data from the server.
 */
export const followUser = async (user) => {
  const response = request(
    `/api/v1/social/profiles/${user}/follow`,
    null,
    true,
    "PUT",
  );
  return response;
};
