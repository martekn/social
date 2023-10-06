/**
 * Traps the tab and shift+tab to inside the focusContainer until keys other than shift, tab or enter is pressed
 * @param {HTMLElement} focusContainer - Element which contains focusable elements
 * @param {String} focusableElements - String containing elements to focus in the format of css selectors
 * @param {Function} exitFocusFunc - Function thats called if keypress doesn't match shift, tab or enter
 * @param {KeyboardEvent} e - event passed from eventlistener
 *
 * @Example
 * ```js
 * // The eventlistener callback function needs to be named in order to remove it later
 * const setModalFocus = (e) => {
 *  handleFocusTrap(modal, "a, button, input", closeModal, e)
 * }
 *
 * // Add eventlistener when you open the modal
 * const openModal = (e) => {
 *  document.addEventListener("keydown", setModalFocus)
 * }
 *
 * // Remove eventlistener when you close the modal
 * const closeModal = (e) => {
 *  document.removeEventlistener("keydown", setModalFocus)
 * }
 * ```
 */
export const handleFocusTrap = (
  focusContainer,
  focusableElements,
  exitFocusFunc,
  e,
) => {
  if (focusContainer) {
    let firstFocusElement;
    let lastFocusElement;
    if ((focusContainer, focusableElements)) {
      const focusElements = focusContainer.querySelectorAll(focusableElements);
      firstFocusElement = focusElements[0];
      lastFocusElement = focusElements[focusElements.length - 1];
    }

    const isTabPressed = e.key === "Tab";

    if (e.key === "Shift" || e.key === "Enter") {
      return;
    }

    if (e.shiftKey && isTabPressed) {
      if (document.activeElement === firstFocusElement) {
        lastFocusElement.focus();
        e.preventDefault();
      }
    } else if (isTabPressed) {
      if (document.activeElement === lastFocusElement) {
        firstFocusElement.focus();
        e.preventDefault();
      }
    } else {
      exitFocusFunc(e);
    }
  }
};
