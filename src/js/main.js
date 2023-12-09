import Storage from "./helper/storage/index.js";
import "./components/index.js";
import { privatePaths } from "./const/private-paths.js";
import { publicPaths } from "./const/public-paths.js";
import { setSidebarScroll } from "./helper/set-sidebar-scroll.js";
import { setNavigationScroll } from "./helper/set-navigation-scroll.js";
import { requiredHeaderKeys, requiredPayloadKeys } from "./const/token-keys.js";
import Jwt from "./helper/jwt/index.js";
import Modal from "./helper/modal/index.js";

const createPostButton = document.querySelector("#create-button");

if (createPostButton) {
  createPostButton.addEventListener("click", (e) => {
    Modal.open(document.querySelector("#modal_post-creation"));
  });
}

const path = window.location.pathname;
const token = Storage.get("accessToken");
const hasToken = Jwt.validate(token, requiredHeaderKeys, requiredPayloadKeys);

if (privatePaths.find((privatePath) => path === privatePath) && !hasToken) {
  window.location.href = "/?auth=login";
}

if (publicPaths.find((publicPath) => path === publicPath) && hasToken) {
  window.location.href = "/feed";
}

if (path !== "/") {
  setSidebarScroll();
  setNavigationScroll();
}
