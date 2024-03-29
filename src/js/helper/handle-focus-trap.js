/**
 * Traps focus within a specified container until keys other than Shift, Tab, or Enter are pressed. Also sets focus to the first element when added as event handler.
 *
 * @param {HTMLElement} focusContainer - The HTML element containing focusable elements.
 * @param {String} focusableElements - A CSS selector for the focusable elements within the container.
 * @param {Function} exitFocusFunc - The function to call if a keypress doesn't match Shift, Tab, or Enter.
 * @param {KeyboardEvent} e - The keyboard event object passed from an event listener.
 *
 * @example
 * // Event listener callback function (needs to be named for removal)
 * const setModalFocus = (e) => {
 *   handleFocusTrap(modal, "a, button, input", closeModal, e);
 * };
 *
 * // Add event listener when opening the modal
 * const openModal = () => {
 *   document.addEventListener("keydown", setModalFocus);
 * };
 *
 * // Remove event listener when closing the modal
 * const closeModal = () => {
 *   document.removeEventListener("keydown", setModalFocus);
 * };
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
    let focusElements;
    let isFocusableElement = false;

    if ((focusContainer, focusableElements)) {
      focusElements = focusContainer.querySelectorAll(focusableElements);
      firstFocusElement = focusElements[0];
      lastFocusElement = focusElements[focusElements.length - 1];
    }

    for (const element of focusElements) {
      if (document.activeElement === element) {
        isFocusableElement = true;
        break;
      }
    }

    if (!isFocusableElement) {
      firstFocusElement.focus();
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
