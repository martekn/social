/**
 * Validates that an object contains all the expected keys.
 *
 * @param {Object} object - The object to be checked.
 * @param {Array} expectedKeys - An array of keys that are expected in the object.
 * @returns {boolean} Returns true if all expected keys are present in the object, or false otherwise.
 */
export const validateObjectKeys = (object, expectedKeys) => {
  return Object.keys(object).every((key) => expectedKeys.includes(key));
};
