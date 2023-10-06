import { stringToBoolean } from "../helper/string-to-boolean.js";
import { handleFocusTrap } from "../helper/handle-focus-trap.js";

const navButton = document.querySelector("#nav-button");
const navClose = document.querySelector("#nav-close");

const mobileMenuToggle = (button) => {
  const menuId = button.getAttribute("aria-controls");
  const menu = document.querySelector(`#${menuId}`);
  let isVisible = stringToBoolean(menu.getAttribute("data-mobile-visible"));

  isVisible = !isVisible;
  button.setAttribute("aria-expanded", isVisible);
  menu.setAttribute("data-mobile-visible", isVisible);
};

const handleFocusNav = (e) => {
  const nav = document.querySelector(
    `#${navButton.getAttribute("aria-controls")}`,
  );

  handleFocusTrap(nav, "button, a", closeNav, e);
};

const closeNav = (e) => {
  document.removeEventListener("keydown", handleFocusNav);
  mobileMenuToggle(navButton);
};

export const setupMobileMenus = () => {
  navButton.addEventListener("click", (e) => {
    mobileMenuToggle(navButton);
    document.addEventListener("keydown", handleFocusNav);
  });

  navClose.addEventListener("click", closeNav);
};
