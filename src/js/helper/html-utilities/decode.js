/**
 * Decodes a string containing html entities
 * @param {String} input - String containing html entities to decode
 * @returns Decoded string
 * @example
 * ```js
 * const decoded = decode("&lt;p&gt;This is an encoded string.&lt;/p&gt;")
 * // Returns <p>This is an encoded string.</p>
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
