/**
 * Creates a request object with the provided parameters.
 *
 * @param {string} endpoint - The URL endpoint for the request.
 * @param {object} params - URL parameters to include in the request.
 * @param {boolean} token - Authorization token for the request.
 * @param {string} method - The HTTP request method (e.g., 'GET', 'POST').
 * @param {any} body - The request body data for methods like 'POST'.
 * @returns {object} A request object.
 */
export const createObject = (endpoint, params, token, method, body) => {
  return { endpoint, params, token, method, body };
};
