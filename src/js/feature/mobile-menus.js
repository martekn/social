import { stringToBoolean } from "../helper/string-to-boolean.js";

const mobileMenuToggle = function (button) {
  const menuId = button.getAttribute("aria-controls");
  const menu = document.querySelector(`#${menuId}`);
  let isVisible = stringToBoolean(menu.getAttribute("data-mobile-visible"));

  isVisible = !isVisible;
  button.setAttribute("aria-expanded", isVisible);
  menu.setAttribute("data-mobile-visible", isVisible);
};

export const setupMobileMenus = () => {
  const navButton = document.querySelector("#nav-button");
  const navClose = document.querySelector("#nav-close");
  const sidebarButton = document.querySelector("#sidebar-button");
  const sidebarClose = document.querySelector("#sidebar-close");

  navButton.addEventListener("click", (e) => {
    mobileMenuToggle(navButton);
  });

  navClose.addEventListener("click", (e) => {
    mobileMenuToggle(navButton);
  });

  sidebarButton.addEventListener("click", (e) => {
    mobileMenuToggle(sidebarButton);
  });

  sidebarClose.addEventListener("click", (e) => {
    mobileMenuToggle(sidebarButton);
  });
};
