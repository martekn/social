/**
 * Stores a value in the browser's local storage.
 *
 * @param {string} key - The key under which the value will be stored.
 * @param {string|number|object} value - The value to be stored. It can be a string, number, or object.
 */
export const set = (key, value) => {
  if (typeof value === "string" || typeof value === "number") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
