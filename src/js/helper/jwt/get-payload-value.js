/**
 * Extracts a specific value from the payload of a JSON Web Token (JWT).
 *
 * @param {string} token - The JSON Web Token (JWT) containing the payload.
 * @param {string} key - The key of the value to extract from the payload.
 * @returns {*} The value associated with the specified key in the payload, or undefined if the key is not found.
 */
export const getPayloadValue = (token, key) => {
  const [header, payload] = token.split(".");
  const parsedPayload = JSON.parse(atob(payload));
  return parsedPayload[key];
};
