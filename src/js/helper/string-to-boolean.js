/**
 * Returns string as boolean value
 * @param {"true"|"false"} input - String containing false or true
 * @returns Boolean
 * @example
 * ```js
 * const boolean = stringToBoolean("false")
 * // Will return false as a boolean value
 * ```
 */
export const stringToBoolean = (input) => {
  input = input.toLowerCase() == "true";
  return input;
};
