import { request } from "./request.js";

/**
 * Makes multiple asynchronous requests to various endpoints and returns an array
 * of settled promises representing the outcome of each request.
 *
 * @param {Array} requests - An array of request objects, each containing information
 * about the request to be made.
 * @param {string} requests[].endpoint - The URL endpoint for the request.
 * @param {Object} requests[].params - URL parameters to include in the request.
 * @param {string} requests[].token - Authorization token for the request.
 * @param {string} requests[].method - The HTTP request method (e.g., 'GET', 'POST').
 * @param {Object} requests[].body - The request body data for methods like 'POST'.
 * @returns {Promise<Array>} A promise that resolves to an array of objects representing
 * the outcome (fulfilled or rejected) of each request.
 */
export const requestAll = async (requests) => {
  const responses = await Promise.allSettled(
    requests.map(async ({ endpoint, params, token, method, body }) => {
      return request(endpoint, params, token, method, body);
    }),
  );

  return responses;
};
