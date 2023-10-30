import { stringToBoolean } from "./string-to-boolean.js";

/**
 * Toggle the visibility of the mobile menus sidebar and navigation
 * @param {HTMLElement} button - Button that opens the menu
 */
export const mobileMenuToggle = (button) => {
  const menuId = button.getAttribute("aria-controls");
  const menu = document.querySelector(`#${menuId}`);
  let isVisible = stringToBoolean(menu.getAttribute("data-mobile-visible"));

  isVisible = !isVisible;

  if (isVisible) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  button.setAttribute("aria-expanded", isVisible);
  menu.setAttribute("data-mobile-visible", isVisible);
};
