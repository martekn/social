/**
  * Creates a debounced function that delays invoking the provided function
 * until a specified amount of time has passed since the last time it was invoked.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} [timeout=150] - The time in milliseconds to wait before invoking `func`.
 * @returns {Function} A debounced version of the provided function.
 * @example
 * ```js
 * window.addEventListener(
  "resize",
  debounce(function (e) {
    alert("end of resizing");
  }),
);

 * ```
 */
export const debounce = (func, timeout = 150) => {
  let timer;
  return function (e) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, timeout, e);
  };
};
