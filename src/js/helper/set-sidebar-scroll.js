import { lgQuery } from "../const/queries.js";
const sidebar = document.querySelector("app-sidebar");
let previousScrollTop = 0;

const sidebarScrollHandler = (e) => {
  const scrollTop = e.target.scrollingElement.scrollTop;
  sidebar.scrollTop += scrollTop - previousScrollTop;
  previousScrollTop = scrollTop;
};

export const setSidebarScroll = () => {
  if (!lgQuery.matches) {
    window.removeEventListener("scroll", sidebarScrollHandler);
  } else {
    window.addEventListener("scroll", sidebarScrollHandler);
  }

  lgQuery.addEventListener("change", (e) => {
    if (!lgQuery.matches) {
      window.removeEventListener("scroll", sidebarScrollHandler);
    } else {
      window.addEventListener("scroll", sidebarScrollHandler);
    }
  });
};
