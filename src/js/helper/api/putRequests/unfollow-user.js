import { request } from "../request.js";

/**
 * Unfollow a user by sending a PUT request to the server.
 *
 * @param {string} user - The username of the user to unfollow.
 * @returns {Promise} A Promise that resolves with the response data from the server.
 */
export const unfollowUser = async (user) => {
  const response = request(
    `/api/v1/social/profiles/${user}/unfollow`,
    null,
    true,
    "PUT",
  );
  return response;
};
