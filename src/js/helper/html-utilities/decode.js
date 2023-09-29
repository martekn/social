/**
 * Decodes a string containing html entities
 * @param {String} string - String to decode
 * @returns Decoded string
 * @example
 * ```js
 * const decoded = decode("&lt;p&gt;This is an encoded string.&lt;/p&gt;")
 * // Returns "<p>This is an encoded string.</p>"
 * ```
 */
export const decode = (string) => {
  if (string) {
    const elem = document.createElement("textarea");
    elem.innerHTML = string;
    return elem.textContent;
  } else {
    return null;
  }
};
