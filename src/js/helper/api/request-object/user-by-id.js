import { createObject } from "./create-request-object.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Creates a request object for retrieving a user's profile.
 *
 * @param {string} username - The username of the user.
 * @returns {object} A request object for retrieving a user's profile.
 */
export const userById = (username) =>
  createObject(
    `${baseApiPath}/profiles/${username}`,
    { _following: "true", _followers: "true" },
    true,
    "GET",
    null,
  );
