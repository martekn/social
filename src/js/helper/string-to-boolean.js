/**
 * Converts a string to a boolean value.
 *
 * @param {string} input - The input string to be converted to a boolean.
 * @returns {boolean|null} The boolean value if the input is 'true' (case-insensitive),
 * or null if the input is falsy.
 *
 * @example
 * ```js
 * const boolean = stringToBoolean("false");
 * // Will return false as a boolean value.
 * ```
 */
export const stringToBoolean = (input) => {
  if (!input) {
    return input;
  }
  input = input.toLowerCase() == "true";
  return input;
};
