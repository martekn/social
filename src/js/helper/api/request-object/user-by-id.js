import { createObject } from "./create-request-object.js";

/**
 * Creates a request object for retrieving a user's profile.
 *
 * @param {string} username - The username of the user.
 * @returns {object} A request object for retrieving a user's profile.
 */
export const userById = (username) => {
  return createObject(
    `/api/v1/social/profiles/${username}`,
    { _following: "true", _followers: "true" },
    true,
    "GET",
    null,
  );
};
