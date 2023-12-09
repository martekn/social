/**
 * Merges arrays of objects while ensuring uniqueness based on a specified key.
 *
 * @param {string} key - The key used to determine uniqueness.
 * @param {...Array} arrays - Arrays of objects to merge.
 * @returns {Array} - A merged array of unique objects.
 */
export const deduplicateObjectArrays = (key, ...arrays) => {
  const mergedArray = [];
  for (let array of arrays) {
    for (let member of array) {
      const currentIds = mergedArray.map((value) => value[key]);
      if (currentIds.includes(member[key])) {
        continue;
      }
      mergedArray.push(member);
    }
  }

  return mergedArray;
};
