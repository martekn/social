import { validateObjectKeys } from "../validate-object-keys.js";
/**
 * Validates the structure of a JSON Web Token (JWT) to ensure it contains
 * the required header, payload and signature components, including specific keys.
 *
 * @param {string} token - The JWT to be validated.
 * @param {Array} requiredHeaderKeys - An array of header keys that must be present.
 * @param {Array} requiredPayloadKeys - An array of payload keys that must be present.
 * @returns {boolean} Returns true if the token structure is valid, or false otherwise.
 */
export const validate = (token, requiredHeaderKeys, requiredPayloadKeys) => {
  if (!token) {
    return false;
  }

  const tokenArray = token.split(".");
  if (tokenArray.length < 3) {
    return false;
  }

  const [header, payload] = tokenArray;
  const parsedHeader = JSON.parse(atob(header));

  if (!parsedHeader) {
    return false;
  } else if (!validateObjectKeys(parsedHeader, requiredHeaderKeys)) {
    return false;
  }

  const parsedPayload = JSON.parse(atob(payload));

  if (!parsedPayload) {
    return false;
  } else if (
    !validateObjectKeys(parsedPayload, requiredPayloadKeys) ||
    !parsedPayload.name
  ) {
    return false;
  }

  return true;
};
