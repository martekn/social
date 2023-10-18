import { request } from "../request.js";
import { login } from "./login.js";

/**
 * Registers a user by sending a POST request to the registration endpoint and then logs them in.
 *
 * @param {object} body - The user registration data.
 * @param {string} body.name - The user's username.
 * @param {string} body.email - The user's email address.
 * @param {string} body.password - The user's password.
 *
 * @throws {Error} If there is an error during registration or login, it will be thrown.
 *
 * @returns {Promise<void>} A promise that resolves when registration and login are successful.
 */
export const register = async (body) => {
  try {
    await request("/api/v1/social/auth/register", null, null, "POST", body);

    await login(
      { email: body.email, password: body.password },
      "/profile/?status=new",
    );
  } catch (error) {
    throw error;
  }
};
