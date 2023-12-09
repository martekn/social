/**
 * Removes a value stored in the browser's local storage under the given key.
 *
 * @param {string} key - The key under which the value is stored and should be removed.
 */
export const remove = (key) => {
  localStorage.removeItem(key);
};
