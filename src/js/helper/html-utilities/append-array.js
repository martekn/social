/**
 * Appends an array of elements to parent element
 * @param {HTMLElement[]} array - Elements to be appended to parent
 * @param {HTMLElement} parent - Parent which elements should append to
 * @example
 * ```js
 * const parentElement = document.createElement("div");
 * const firstChild = document.createElement("div");
 * const secondChild = document.createElement("div");
 *
 * appendArray([firstChild, secondChild], parentElement)
 * ```
 */
export const appendArray = (array, parent) => {
  for (const element of array) {
    parent.append(element);
  }
};
