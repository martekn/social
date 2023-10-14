/**
 * Retrieves a value stored in the browser's local storage under the given key.
 *
 * @param {string} key - The key used to look up the stored value.
 *
 * @returns {string|number|object|null} The stored value or `null` if the key does not exist. If the stored value is an object, it will be deserialized from JSON.
 */
export const get = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
