import { createObject } from "./create-request-object.js";

/**
 * Creates a request object for retrieving all posts.
 *
 * @returns {object} A request object for retrieving all posts.
 */
export const allPosts = () => {
  return createObject(
    "/api/v1/social/posts",
    { _author: "true", _comments: "true", _reactions: "true" },
    true,
    "GET",
    null,
  );
};
