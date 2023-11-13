import { createObject } from "./create-request-object.js";
import { baseApiPath } from "../../../const/base-url.js";

/**
 * Creates a request object for retrieving all users.
 *
 * @returns {object} A request object for retrieving all users.
 */
export const allUsers = () =>
  createObject(
    `${baseApiPath}/profiles`,
    { _following: "true", _followers: "true" },
    true,
    "GET",
    null,
  );
