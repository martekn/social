import { mdQuery } from "../const/queries.js";

const navigation = document.querySelector("app-navigation");
let previousScrollTop = 0;

const navigationScrollHandler = (e) => {
  const scrollTop = e.target.scrollingElement.scrollTop;
  navigation.scrollTop += scrollTop - previousScrollTop;
  previousScrollTop = scrollTop;
};

export const setNavigationScroll = () => {
  if (!mdQuery.matches) {
    window.removeEventListener("scroll", navigationScrollHandler);
  } else {
    window.addEventListener("scroll", navigationScrollHandler);
  }

  mdQuery.addEventListener("change", (e) => {
    if (!mdQuery.matches) {
      window.removeEventListener("scroll", navigationScrollHandler);
    } else {
      window.addEventListener("scroll", navigationScrollHandler);
    }
  });
};
