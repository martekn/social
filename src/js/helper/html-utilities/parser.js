/**
 * Parse html string through DOMParser and return element
 * @param {String} htmlString - string containing html
 * @returns HTML body element
 * @example
 * ```js
 * const element = parser("hello <strong>World</strong>")
 * ```
 */
export const parser = (htmlString) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(htmlString, "text/html");

  return content.body;
};
