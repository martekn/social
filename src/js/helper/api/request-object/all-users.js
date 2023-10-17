import { createObject } from "./create-request-object.js";

/**
 * Creates a request object for retrieving all users.
 *
 * @returns {object} A request object for retrieving all users.
 */
export const allUsers = () => {
  return createObject(
    `/api/v1/social/profiles`,
    { _following: "true", _followers: "true" },
    true,
    "GET",
    null,
  );
};
