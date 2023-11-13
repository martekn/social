import { request } from "../request.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Follow a user by sending a PUT request to the server.
 *
 * @param {string} user - The username of the user to follow.
 * @returns {Promise} A Promise that resolves with the response data from the server.
 */
export const followUser = async (user) => {
  const response = request(
    `${baseApiPath}/profiles/${user}/follow`,
    null,
    true,
    "PUT",
  );
  return response;
};
