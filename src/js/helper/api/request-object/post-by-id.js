import { createObject } from "./create-request-object.js";

/**
 * Creates a request object for retrieving a post by its ID.
 *
 * @param {string} id - The ID of the post to retrieve.
 * @returns {object} A request object for retrieving a post by ID.
 */
export const postById = (id) => {
  return createObject(
    `/api/v1/social/posts/${id}`,
    { _author: "true", _comments: "true", _reactions: "true" },
    true,
    "GET",
    null,
  );
};
