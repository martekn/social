const sidebar = document.querySelector("app-sidebar");
const lgQuery = window.matchMedia("(min-width: 1024px)");
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
