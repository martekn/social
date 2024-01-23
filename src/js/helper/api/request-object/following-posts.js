import { createObject } from "./create-request-object.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Creates a request object for retrieving posts from users that the current user is following.
 *
 * @returns {object} A request object for retrieving following posts.
 */
export const followingPosts = () =>
  createObject(
    `${baseApiPath}/posts/following`,
    { _author: "true", _comments: "true", _reactions: "true" },
    true,
    "GET",
    null,
  );
