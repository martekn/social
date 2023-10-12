/**
 * Returns a string as a boolean value.
 *
 * @param {"true"|"false"} input - A string containing "false" or "true."
 * @returns {Boolean} - The converted boolean value.
 *
 * @example
 * ```js
 * const boolean = stringToBoolean("false");
 * // Will return false as a boolean value.
 * ```
 */
export const stringToBoolean = (input) => {
  input = input.toLowerCase() == "true";
  return input;
};
