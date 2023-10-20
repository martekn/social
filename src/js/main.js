import Storage from "./helper/storage/index.js";
import "./components/index.js";
import { privatePaths } from "./const/private-paths.js";
import { publicPaths } from "./const/public-paths.js";
import { renderToast } from "./helper/render-toast.js";
const createPostButton = document.querySelector("#create-button");

if (createPostButton) {
  createPostButton.addEventListener("click", (e) => {
    document.querySelector("#modal_post-creation").showModal();
  });
}

const searchParams = new URLSearchParams(window.location.search);
const createdQuery = searchParams.get("created");

if (createdQuery === "true") {
  renderToast("Success: Post was created", "post-success", "success");
  const newURL = window.location.href
    .replace("?created=true", "")
    .replace("&created=true");
  history.replaceState(null, "", newURL);
}

const token = Storage.get("accessToken");
const path = window.location.pathname;

if (privatePaths.find((privatePath) => path === privatePath) && !token) {
  window.location.href = "/?auth=login";
}

if (publicPaths.find((publicPath) => path === publicPath) && token) {
  window.location.href = "/feed";
}
