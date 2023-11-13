import { createObject } from "./create-request-object.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Creates a request object for retrieving posts by tag.
 *
 * @param {string} tag - The tag to filter posts.
 * @returns {object} A request object for retrieving posts by tag.
 */
export const postsByTag = (tag) =>
  createObject(
    `${baseApiPath}/posts`,
    { _tag: tag, _author: "true", _comments: "true", _reactions: "true" },
    true,
    "GET",
    null,
  );
