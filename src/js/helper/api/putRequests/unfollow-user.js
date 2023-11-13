import { request } from "../request.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Unfollow a user by sending a PUT request to the server.
 *
 * @param {string} user - The username of the user to unfollow.
 * @returns {Promise} A Promise that resolves with the response data from the server.
 */
export const unfollowUser = async (user) => {
  const response = request(
    `${baseApiPath}/profiles/${user}/unfollow`,
    null,
    true,
    "PUT",
  );
  return response;
};
