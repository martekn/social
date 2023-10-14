import { request } from "../request.js";
import Storage from "../../storage/index.js";

/**
 * Logs in a user by sending a POST request to the login endpoint and stores user information.
 *
 * @param {object} body - The login data.
 * @param {string} body.email - The user's email address.
 * @param {string} body.password - The user's password.
 *
 * @throws {Error} If there is an error during the login process, it will be thrown.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged in and user information is stored.
 */
export const login = async (body) => {
  try {
    const response = await request(
      "/api/v1/social/auth/login",
      null,
      null,
      "POST",
      body,
    );

    Storage.set("accessToken", response.accessToken);
    Storage.set("username", response.name);

    window.location.href = "/profile";
  } catch (error) {
    throw error;
  }
};
