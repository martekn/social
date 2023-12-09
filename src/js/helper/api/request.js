import { baseUrl } from "../../const/base-url.js";
import Storage from "../storage/index.js";

/**
 * Makes an asynchronous HTTP request to a specified endpoint with optional parameters, authentication token, method, and request body.
 *
 * @async
 * @param {String} endpoint - The endpoint for the HTTP request.
 * @param {Object} [params] - Optional query parameters as key-value pairs (e.g., { key: value }).
 * @param {String} [token] - An authentication token for the request (optional).
 * @param {String} [method="GET"] - The HTTP method for the request (e.g., "GET", "POST"). Default is "GET".
 * @param {Object} [body] - The request body data to send (if applicable) as an object.
 * @returns {Promise} - A promise that resolves to the JSON response data from the HTTP request.
 */
export const request = async (
  endpoint,
  params = null,
  token = null,
  method = "GET",
  body = null,
) => {
  let url = baseUrl;

  if (endpoint) {
    url += endpoint;
  }
  const options = {
    method,
    headers: {},
  };

  if (token) {
    const token = Storage.get("accessToken");
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (params) {
    url = `${url}?${new URLSearchParams(params).toString()}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].message);
  }

  const result = await response.json();
  return result;
};
