import { createObject } from "./create-request-object.js";

/**
 * Creates a request object for retrieving a user's posts.
 *
 * @param {string} username - The username of the user.
 * @returns {object} A request object for retrieving a user's posts.
 */
export const userPosts = (username) => {
  return createObject(
    `/api/v1/social/profiles/${username}/posts`,
    {
      _comments: "true",
      _reactions: "true",
      _author: "true",
    },
    true,
    "GET",
    null,
  );
};
