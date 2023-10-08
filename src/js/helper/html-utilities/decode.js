/**
 * Decodes HTML entities in a given input string.
 *
 * @param {string|null} input - The input string that may contain HTML entities.
 * @returns {string|null} - The decoded string or null if the input is falsy.
 *
 * @example
 * ```js
 * const encodedString = "&lt;p&gt;This is an example&lt;/p&gt;";
 * const decodedString = decode(encodedString);
 * // decodedString will contain: "<p>This is an example</p>"
 * ```
 */
export const decode = (input) => {
  if (input) {
    const elem = document.createElement("textarea");
    elem.innerHTML = input;
    return elem.textContent;
  } else {
    return null;
  }
};
