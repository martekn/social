import Storage from "./helper/storage/index.js";
import "./components/index.js";
import { privatePaths } from "./const/private-paths.js";
import { publicPaths } from "./const/public-paths.js";
import { setSidebarScroll } from "./helper/set-sidebar-scroll.js";
import { setNavigationScroll } from "./helper/set-navigation-scroll.js";

const createPostButton = document.querySelector("#create-button");

if (createPostButton) {
  createPostButton.addEventListener("click", (e) => {
    document.querySelector("#modal_post-creation").showModal();
  });
}

const token = Storage.get("accessToken");
const path = window.location.pathname;

if (privatePaths.find((privatePath) => path === privatePath) && !token) {
  window.location.href = "/?auth=login";
}

if (publicPaths.find((publicPath) => path === publicPath) && token) {
  window.location.href = "/feed";
}

if (path !== "/") {
  setSidebarScroll();
  setNavigationScroll();
}
