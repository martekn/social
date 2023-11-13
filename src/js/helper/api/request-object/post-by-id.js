import { createObject } from "./create-request-object.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Creates a request object for retrieving a post by its ID.
 *
 * @param {string} id - The ID of the post to retrieve.
 * @returns {object} A request object for retrieving a post by ID.
 */
export const postById = (id) =>
  createObject(
    `${baseApiPath}/posts/${id}`,
    { _author: "true", _comments: "true", _reactions: "true" },
    true,
    "GET",
    null,
  );
